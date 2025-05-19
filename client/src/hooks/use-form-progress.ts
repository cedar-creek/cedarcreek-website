import { useState, useEffect } from "react";

export function useFormProgress<T>(key: string) {
  // Save form progress to localStorage
  const saveProgress = (data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save form progress:", error);
    }
  };

  // Load form progress from localStorage
  const loadProgress = (): T | null => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        return JSON.parse(savedData) as T;
      }
      return null;
    } catch (error) {
      console.error("Failed to load form progress:", error);
      return null;
    }
  };

  // Clear form progress from localStorage
  const clearProgress = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to clear form progress:", error);
    }
  };

  return {
    saveProgress,
    loadProgress,
    clearProgress,
  };
}
