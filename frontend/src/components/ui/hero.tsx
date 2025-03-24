"use client";

import { MoveRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/ui/sign-in";
import Image from "next/image";
import Link from "next/link";
import { IconBuildingBank, IconRobot, IconChartBar, IconCreditCard } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function Hero() {
  const features = [
    {
      title: "Alpaca Integration",
      description: "Seamless signup and KYC process with Alpaca's Jamaican-friendly infrastructure for global market access.",
      icon: <IconBuildingBank className="w-6 h-6" />,
    },
    {
      title: "Natural Language Trading",
      description: "Trade effortlessly using simple commands like 'Buy $50 AAPL' - no technical expertise needed.",
      icon: <IconRobot className="w-6 h-6" />,
    },
    {
      title: "Portfolio Dashboard",
      description: "Track your Alpaca account balance and view your complete transaction history at a glance.",
      icon: <IconChartBar className="w-6 h-6" />,
    },
    {
      title: "Easy Donations",
      description: "Support the platform through our integrated Paddle donation system, completely separate from trading funds.",
      icon: <IconCreditCard className="w-6 h-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>
      <div className="relative bg-black pt-24 pb-16 lg:pt-32 lg:pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black to-black/90"
        />
        
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-8"
            >
              <motion.h1 variants={itemVariants} className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-yellow-400"
                >
                  Finally
                </motion.span>
                , a trading app that{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-yellow-400"
                >
                  just works
                </motion.span>
                .
              </motion.h1>

              <motion.h2 variants={itemVariants} className="font-medium text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-xl">
                Simplify your access to global markets without the confusion.
              </motion.h2>

              <motion.p variants={itemVariants} className="font-normal text-lg text-white/70 max-w-xl leading-relaxed">
                Most trading apps are a confusing mess of charts and jargon that leave you feeling lost.
                <br /><br />
                We&apos;ve stripped away the complexity and built something different—
                <span className="font-medium text-yellow-400">something Jamaicans actually need</span>.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SignInButton 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6 h-auto transition-all"
                  >
                    Get Started Now <MoveRight className="w-5 h-5 ml-2" />
                  </SignInButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-black hover:bg-white hover:text-black text-white font-medium text-lg px-8 py-6 h-auto transition-all"
                    asChild
                  >
                    <Link href="https://twitter.com/messages/compose?recipient_id=jondoescoding&text=Hey%20Jon%20%F0%9F%91%8B" target="_blank" rel="noopener noreferrer">
                      Contact Dev <MessageCircle className="w-5 h-5 ml-2 inline-block" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
            >
              <Image
                src="/images/hero/trading-interface-showcase.jpg"
                alt="Trading interface showcase"
                fill
                className="object-cover"
                priority
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-white">Why Choose Kryptt?</h2>
            <p className="text-lg font-normal text-white/70 max-w-2xl leading-relaxed">
              Experience the future of trading with features designed specifically for Jamaican investors.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 border border-white/10 rounded-lg hover:border-yellow-400/50 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="mb-6 text-yellow-400"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-medium mb-3 text-white group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base font-normal text-white/70 leading-relaxed">
                  {feature.description}
                </p>
                <motion.div
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  className="absolute left-0 top-0 w-1 bg-yellow-400 transition-all duration-300 rounded-tl-lg rounded-bl-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 