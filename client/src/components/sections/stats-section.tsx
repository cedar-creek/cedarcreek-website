import { motion } from "framer-motion";

export function StatsSection() {
  const stats = [
    { value: "40%", description: "Average Productivity Increase" },
    { value: "30%", description: "Cost Reduction" },
    { value: "60+", description: "Business Processes Enhanced" },
    { value: "90", description: "Days to Transformation" },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">AI Transformation by the Numbers</h2>
          <p className="text-lg text-neutral-600">
            Businesses implementing our AI Accelerator Blueprint™ see measurable results
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-neutral-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-lg text-neutral-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
