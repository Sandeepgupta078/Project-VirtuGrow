import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  "Create, update, and delete tasks effortlessly",
  "JWT-based secure authentication",
  "User-specific task management",
  "Real-time updates and smooth UI",
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose TaskMaster?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-center gap-3 bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <CheckCircle className="text-blue-500 w-6 h-6" />
            <p className="text-gray-700">{feature}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
