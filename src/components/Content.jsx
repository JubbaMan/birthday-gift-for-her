import React, { useEffect, useRef, useCallback, useState } from "react";
import "./Content.css";

// Extracted data for maintainability (MOVED TO TOP)
const wishesData = [
  { name: "Honeybun", message: "One day, the life that hurts you now will become the story that saves someone else..just like every chapter of your life you bring the light Happy sweet 16" },
  { name: "Lamisa", message: "I wish from the core of my heart that you will success in you life, get everything what you want and God will bless you heaven with abundance. Happay birthday my dear friend." },
  { name: "Vaiya", message: "Happy birthday to my pretty little sister. You were the one who brought colours to my black and white silouhet and however you take it, I love you a lottttttttttttttttttttttttttttttttttt." },
  { name: "Newborn", message: "Arek bochor bura hoye jaoar onek shubeccha." },
  { name: "Niyamul", message: "Funny how time passes without asking anyone first." },
  { name: "Anno", message: "May you have the courage to become who you truly are!! Rather than who the world expects you to be~  Happiest Birthday Sana Di🖤!!" },
  { name: "Arisha", message: "Happiest birthday apuu, dont stop shining and always be the same swagata apuu🤍." },
  { name: "Archi", message: "Happy birthdayyy swagata always be happy and shine bright..enjoy." },
  { name: "Krittika", message: "Happy birthday sagooo vhalo thak besi depression a thakis na... R jeidi koris ulta palta koris na r.. Ssc te valo kor.. Krittika lovessss you🫶🏼💐" },
  { name: "Turash", message: "Funny how time passes without asking anyone first." },
  { name: "Jayed Vaiii", message: "Happy Birthday Sana 🥳 You bring light and positivity wherever you go. I hope this day brings you as much joy as you bring to the people around you. Stay blessed always." },
  { name: "Kazi Raiyan Vaiya", message: "Always keep shining like the brightest star to witness from any galaxy... Happy birthday my little Champ and keep walking on my footprints like the DOT 🫶🏻 – Kazi Raiyan Hasin" },
  { name: "Kazi Shaiyan", message: "Happy birthday Swagata apu." },
  { name: "Raiyan Chowdhury Vaiya", message: "Happy birthday swagata, wishing you a very prosperous and happy life ahead." },
  { name: "Talha Vaiya", message: "Happy Birthday Sister. আশা করি তুই নিজের life–এ অনেক happy থাকোস এবং নিজের goals achieve করতে পারোস। এবং নিজের life–এর সব obstacles তুই easily cross করতে পারোস। তোর জন্য অনেক অনেক দোয়া রইলো। ❤️" },
  { name: "Ilma Apu", message: "Happy Birthday to the soul that makes ordinary days feel a little softer.✨🌷." },
  { name: "Magur Mach", message: "Happy birthday to our best debater. With the best wishes for the next journey of your life." },
  { name: "Samiul Sami", message: "🎉🎆🎉🎊🎊Happy birthday swagata apu. Hope you a successfull and happy life .🎉🎉🎊🎊🎆" },
  { name: "Nashid", message: "🎉Happy birthday Sana Sisither🎊,🎂🥳🎀✨" },
  { name: "Md. Tolha", message: "শুভ জন্মদিন! আকাশের নীলিমা আর বসন্তের স্নিগ্ধতা ছুঁয়ে যাক তোমার জীবন। তোমার চিরচেনা ওই মিষ্টি হাসিতে ভরে উঠুক আগামীর প্রতিটি দিন。" },
];

const Content = () => {
  const scrollRef = useRef(null);
  
  // REMOVED: intervalRef, isUserInteracting, userInteractTimeoutRef
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    {
      title: "Family Line",
      cover: "/family.jpg",
      file: "/familyline.mp3",
    },
    {
      title: "Kodom",
      cover: "/kodom.jpg",
      file: "/Kodom.mp3",
    },
    {
      title: "Theres Nothing Holding Me Back",
      cover: "/nhmb.jpg",
      file: "/nothinghmeb.mp3",
    },
    {
      title: "Jealousy Jealousy",
      cover: "/jous.jpg",
      file: "/jelous.mp3",
    },
    {
      title: "Dendalions",
      cover: "/dendali.jpg",
      file: "/dendalions.mp3",
    },
  ];

  // Simplified scroll functions - removed auto-scroll logic
  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: 420, behavior: "smooth" });
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log(err);
      }
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  // Audio ended handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentTrack(prev => (prev + 1) % tracks.length);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks.length]);

  // Track change handler
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = tracks[currentTrack].file;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(err => console.log("Play error:", err));
    }
  }, [currentTrack, isPlaying, tracks]);

  // REMOVED: Auto-scroll initialization useEffect

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollLeft();
      } else if (e.key === "ArrowRight") {
        scrollRight();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollLeft, scrollRight]);

  return (
    <>
      <div className="bg" aria-hidden="true" />
      <div className="overlay" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="orb orb1" aria-hidden="true" />
      <div className="orb orb2" aria-hidden="true" />
      <div className="orb orb3" aria-hidden="true" />

      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="hero-left">
          <p className="hero-date" aria-label="Date">15 June 2026</p>
          <h1 className="hero-title">
            Happy <br />
            <span>Birthday</span>
          </h1>
          <p className="hero-subtitle">
            Some stories deserve more than just a message.
          </p>
          <div className="hero-line" aria-hidden="true" />
          <p className="hero-text">
            So I made something you can return to later.
            <br />
            A small collection of memories, effort and moments.
          </p>
          
          <div className="hero-music-player">
            <audio
              ref={audioRef}
              preload="metadata"
            />

            <div className="music-top">
              <img
                src={tracks[currentTrack].cover}
                alt={tracks[currentTrack].title}
                className="mini-cover"
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                }}
              />

              <div>
                <p className="music-label">
                  Soundtrack
                </p>

                <h4>
                  {tracks[currentTrack].title}
                </h4>
              </div>
            </div>

            <div className="music-controls">
              <button onClick={prevTrack}>
                ⏮
              </button>

              <button
                onClick={togglePlay}
                className="play-btn"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button onClick={nextTrack}>
                ⏭
              </button>
            </div>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="image-glow" aria-hidden="true" />
          <img src="/her.png" alt="Her portrait" className="hero-image" />
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <p className="quote">
          “Some people unknowingly become entire eras
          of someone else's life.”
        </p>
      </section>

      {/* WISHES CAROUSEL SECTION */}
      <section id="wishes" className="wishes-section" aria-labelledby="wishes-heading">
        <div className="section-heading">
          <p>01</p>
          <h2 id="wishes-heading">Wishes</h2>
        </div>

        <div className="carousel-buttons">
          <button onClick={scrollLeft} aria-label="Scroll left">
            ←
          </button>
          <button onClick={scrollRight} aria-label="Scroll right">
            →
          </button>
        </div>

        <div
          className="wish-grid"
          ref={scrollRef}
          // REMOVED: onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd
          role="region"
          aria-label="Birthday wishes carousel"
          tabIndex={0}
        >
          {wishesData.map((wish, idx) => (
            <div className="wish-card" key={idx} role="article">
              <span>{String(idx + 1).padStart(2, "0")}</span>
              <h3>{wish.name} :</h3>
              <p>{wish.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GIFTS SECTION */}
      <section id="gifts" className="letter-section">
        <div className="section-heading">
          <p>02</p>
          <h2>A Letter</h2>
        </div>

        <div className="letter-layout">
          <div className="letter-content">
            <p>
              I don't even know where to start with this, honestly.

              The funny thing is that none of this was supposed to happen. If someone had told me a few years ago that I'd end up making an entire game, a website, posters, stories and whatever else this project has turned into, I would've probably laughed at them and gone back to whatever I was doing. Back then it was just a van. That's it. A van ride. I got in, sat down, and that was the end of it. There wasn't some dramatic moment where I suddenly realized, "Wow, this is going to be important someday." It was just another normal day that blended into every other normal day.

              And somehow that's what makes it so weird.

              Because when I think about the things I remember most, they're never the things that seemed important at the time. They're the random moments. The conversations that didn't really matter. The jokes that probably weren't even funny. The arguments over absolutely nothing. The exam periods where everyone ended up together again. The bridge. The piece of paper. All of those things were so ordinary that if someone had asked me back then whether I'd still remember them years later, I would've said no without thinking twice.

              Making the game was probably the first time I actually sat down and looked back at all of it properly. I kept remembering things I'd completely forgotten about. I'd be working on one chapter and suddenly another memory would pop into my head. Then another. Then another. Half of the time I wasn't even working, I was just sitting there thinking, "Dayum, I completely forgot that happened."

              Honestly, this project got way out of hand. The original plan was something simple. A message, maybe. A letter. Something normal. Something that wouldn't completely destroy my sleep schedule. Instead, every time I finished one thing, my brain came up with another idea. Then another. Then somehow I was making a game based on years of memories and questioning every life decision that led me to that point. There were moments where I genuinely considered cutting half of it. There were moments where I said, "Okay, this is enough." There were also moments where I immediately ignored myself and kept adding more stuff anyway.

              But looking back, I'm glad I did.

              Not because of the game itself. Not because of the website. Not because of the poster or any of the other things. Those are just ways of putting everything together. The important part is the memories behind them. Most people probably have memories like these and never really think about them again. I guess this was my way of making sure I didn't.

              So if you've actually made it all the way here, first of all, congratulations. Second of all, you've officially become important enough for someone to spend an unreasonable amount of time and sleep turning a bunch of memories into an entire project. Whether that's wholesome or slightly concerning is still up for debate.

              Either way, happy birthday.

              Thank you for all the memories.

              And thank you for unknowingly giving me enough material to spend weeks making a game.
            </p>
          </div>

          <div className="letter-poster">
            <img
              src="/herrposterrr.png"
              alt="Birthday Poster"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg";
              }}
            />

            <a
              href="/herrposterrr.png"
              download
              className="poster-download"
            >
              Download Poster
            </a>
          </div>
        </div>
      </section>

      {/* GAME SECTION */}
      <section id="game" className="game-section">
        <div className="game-panel">
          <p className="game-tag">THE GAME!!</p>
          <h2 className="game-title">Our Way Through</h2>
          <p className="game-desc">
            A gift only your kiddo can give you...
          </p>
          <div className="game-info">
            <div><span>Genre</span><p>Story / Journey</p></div>
            <div><span>Length</span><p>Short Experience</p></div>
            <div><span>Made With</span><p>Way Too Much Effort</p></div>
          </div>
          <button className="download-btn" aria-label="Download game">
            Coming Soon...
          </button>
        </div>
      </section>
    </>
  );
};

export default Content;