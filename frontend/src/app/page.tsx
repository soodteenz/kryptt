import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/ui/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    question: "How do I get started with trading?",
    answer: "Getting started is easy! Simply sign up for an account, complete the KYC process through our Alpaca integration, and you can start trading with simple commands.",
  },
  {
    question: "Is my money safe?",
    answer: "Yes, your funds are held securely with Alpaca, a regulated broker-dealer. We never directly handle your trading funds.",
  },
  {
    question: "What markets can I trade?",
    answer: "Through our Alpaca integration, you can access US stocks and ETFs. We&apos;re continuously working to expand our market offerings.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <section className="bg-black py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-lg font-normal text-white/70 leading-relaxed">
                Got questions? We&apos;ve got answers.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-white/10 rounded-lg px-8 py-2 bg-transparent"
                  >
                    <AccordionTrigger className="text-lg font-medium text-white hover:no-underline hover:text-yellow-400 transition-colors py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-normal text-white/70 leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black py-24 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col text-center p-12 gap-8 items-center bg-white/5 rounded-2xl border border-white/10">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    Ready to start trading?
                  </h2>
                  <p className="text-lg font-normal text-white/70 leading-relaxed max-w-2xl mx-auto">
                    Join thousands of Jamaican investors who are already using Kryptt to access global markets with ease.
                  </p>
                </div>
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6 h-auto transition-all"
                  asChild
                >
                  <Link href="/login">
                    Get Started Now <MoveRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
