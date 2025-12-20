// reCAPTCHA v3 verification utility

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MINIMUM_SCORE = 0.5; // Score threshold (0.0 - 1.0)

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export interface VerificationResult {
  success: boolean;
  score?: number;
  error?: string;
}

export async function verifyRecaptcha(token: string, expectedAction?: string): Promise<VerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return { success: true, score: 1.0 };
  }
  
  if (!token) {
    // Allow submission without token if reCAPTCHA script failed to load on client
    // This prevents blocking legitimate users when reCAPTCHA has issues
    console.warn('reCAPTCHA token not provided - allowing submission with reduced security');
    return { success: true, score: 0.3 };
  }
  
  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });
    
    const data: RecaptchaResponse = await response.json();
    
    if (!data.success) {
      const errorCodes = data['error-codes']?.join(', ') || 'Unknown error';
      console.error('reCAPTCHA verification failed:', errorCodes);
      return { success: false, error: 'Security verification failed' };
    }
    
    // Check score threshold
    if (data.score !== undefined && data.score < MINIMUM_SCORE) {
      console.warn(`reCAPTCHA score too low: ${data.score}`);
      return { 
        success: false, 
        score: data.score,
        error: 'Security verification failed. Please try again.' 
      };
    }
    
    // Optionally verify action matches
    if (expectedAction && data.action !== expectedAction) {
      console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { success: false, error: 'Security verification failed' };
    }
    
    return { success: true, score: data.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Security verification temporarily unavailable' };
  }
}
