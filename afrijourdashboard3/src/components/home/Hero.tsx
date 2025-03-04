// import { motion } from 'framer-motion'
// import { BookOpen, GraduationCap, Globe2 } from 'lucide-react'

// interface HeroProps {
//   totalJournals: number
// }

// export function Hero({ totalJournals }: HeroProps) {
//   return (
//     <section className="relative overflow-hidden bg-primary px-6 py-6 text-primary-foreground">
     
//       <h1>Welcome To Kenya</h1>
//     </section>
//   )
// }

 {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-5xl text-center"
      >
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
          Discover African Academic Excellence
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
          Access {totalJournals.toLocaleString()} peer-reviewed journals from across Africa,
          featuring groundbreaking research and scholarly articles.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Peer-Reviewed",
              description: "Quality assured academic content",
            },
            {
              icon: GraduationCap,
              title: "Multi-Disciplinary",
              description: "Covering diverse academic fields",
            },
            {
              icon: Globe2,
              title: "Pan-African",
              description: "Research from across the continent",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <feature.icon className="mx-auto mb-4 h-8 w-8" />
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-primary-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div> */}


      import { motion } from "framer-motion";
      import { BookOpen, GraduationCap, Globe2 } from "lucide-react";
      
      interface HeroProps {
        totalJournals: number;
      }
      
      export function Hero({ totalJournals }: HeroProps) {
        const stats = [
          {
            icon: BookOpen,
            number: totalJournals.toLocaleString(),
            label: "Journals",
          },
          {
            icon: GraduationCap,
            number: "120+",
            label: "Disciplines",
          },
          {
            icon: Globe2,
            number: "50+",
            label: "Countries",
          },
        ];
      
        return (
          <section className="relative overflow-hidden bg-primary px-4 py-3 text-primary-foreground">
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-6 whitespace-nowrap items-center"
                animate={{ x: ["100%", "-100%"] }} // Moves from right to left
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Infinite loop
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-2 w-28 backdrop-blur-sm"
                  >
                    <stat.icon className="h-6 w-6 text-white mb-1" />
                    <span className="text-lg font-semibold">{stat.number}</span>
                    <span className="text-xs text-primary-foreground/70">{stat.label}</span>
                  </div>
                ))}
                {/* Duplicate stats for seamless scrolling */}
                {stats.map((stat, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-2 w-28 backdrop-blur-sm"
                  >
                    <stat.icon className="h-6 w-6 text-white mb-1" />
                    <span className="text-lg font-semibold">{stat.number}</span>
                    <span className="text-xs text-primary-foreground/70">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      }
      