import { motion } from "framer-motion";

const WhatsAppFloat = () => {
  const phone = "3878375270";
  const message = "Hola, quiero hacer una consulta sobre su servicio...";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d3656f] shadow-lg md:bottom-8 md:right-8 md:h-[60px] md:w-[60px]"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        className="h-8 w-8"
      />
    </motion.a>
  );
};

export default WhatsAppFloat;