/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hls from 'hls.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ArrowRight,
  X,
  Menu,
  Target,
  Map,
  Cpu,
  RefreshCw,
  Users,
  FileText,
  Calendar,
  ChevronDown,
  AlertCircle,
  Trophy,
  Mail,
  Facebook,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  Twitter,
  Linkedin,
  Instagram,
  Zap
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const HlsVideo = ({ src, fallback }: { src: string; fallback: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      video.src = fallback;
    }
  }, [src, fallback]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto mix-blend-screen"
    />
  );
};

// --- Data ---

const NAV_LINKS = [
  { name: "Giới thiệu", href: "#about" },
  { name: "Chủ đề", href: "#theme" },
  { name: "Lộ trình", href: "#timeline" },
  { name: "Giải thưởng", href: "#prizes" },
  { name: "Tài liệu", href: "#deliverables" },
  { name: "Chấm điểm", href: "#scoring" },
  { name: "FAQ", href: "#faq" },
  { name: "Liên hệ", href: "#contact" },
];

const ABOUT_CARDS = [
  {
    title: "Luyện tập thực chiến",
    desc: "Biến kiến thức Training thành sản phẩm thực tế.",
    icon: <Cpu className="w-6 h-6 text-accent-blue" />,
  },
  {
    title: "Rèn tư duy sản phẩm",
    desc: "Định nghĩa vấn đề, thiết kế giải pháp, thuyết trình.",
    icon: <Target className="w-6 h-6 text-accent-purple" />,
  },
  {
    title: "Bàn đạp cho cuộc thi lớn",
    desc: "Tích lũy kinh nghiệm, tự tin đi thi bên ngoài.",
    icon: <ArrowRight className="w-6 h-6 text-accent-cyan" />,
  },
];

const THEME_FEATURES = [
  { title: "Goal-Driven", icon: <Target className="w-6 h-6 text-accent-blue" />, desc: "Hành động dựa trên mục tiêu cụ thể." },
  { title: "Planning", icon: <Map className="w-6 h-6 text-accent-purple" />, desc: "Khả năng lập kế hoạch và phân rã nhiệm vụ." },
  { title: "Autonomy", icon: <Cpu className="w-6 h-6 text-accent-cyan" />, desc: "Tự vận hành mà không cần can thiệp liên tục." },
  { title: "Feedback Loop", icon: <RefreshCw className="w-6 h-6 text-white" />, desc: "Học hỏi và điều chỉnh từ kết quả thực thi." },
];

const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Ghép đội & Lên ý tưởng",
    date: "Tối 26/03",
    items: [
      "Mở form đăng ký đội thi (1-4 thành viên).",
      "20:00 26/03: Info Session & Team Matching trên Discord.",
      "Giải thích AI Agent, thể lệ, tiêu chí chấm, gợi ý ý tưởng, kết nối thành viên."
    ],
    icon: <Users className="w-5 h-5" />
  },
  {
    phase: "Phase 2",
    title: "Phát triển ý tưởng",
    date: "29/03 - 13/04",
    items: [
      "18:00 29/03: Hạn chót chốt danh sách đội.",
      "30/03 – 13/04: Các đội xây dựng tài liệu dự thi."
    ],
    icon: <FileText className="w-5 h-5" />
  },
  {
    phase: "Phase 3",
    title: "Pitch Vòng Idea",
    date: "19:00 13/04",
    items: [
      "Thuyết trình online – 20 phút/đội.",
      "BTC chấm và trao giải tiền mặt cho ý tưởng xuất sắc."
    ],
    icon: <Calendar className="w-5 h-5" />
  }
];

const PITCH_DECK_STRUCTURE = [
  {
    title: "Slide 1 — Trang bìa",
    bullets: [
      "Tên sản phẩm / dự án.",
      "Slogan ngắn gọn (1 câu).",
      "Tên thành viên trong đội."
    ]
  },
  {
    title: "Slide 2 — Vấn đề (Problem Statement)",
    bullets: [
      "Trả lời câu hỏi: \"Bạn đang giải quyết vấn đề gì?\"",
      "Mô tả rõ bối cảnh thực tế của vấn đề.",
      "Ai đang bị ảnh hưởng? (đối tượng người dùng mục tiêu)",
      "Hậu quả / thiệt hại nếu vấn đề không được giải quyết.",
      "Có thể dùng số liệu, dữ liệu thực tế hoặc câu chuyện người dùng để minh họa."
    ]
  },
  {
    title: "Slide 3 — Giải pháp (Solution Overview)",
    bullets: [
      "Trả lời câu hỏi: \"Sản phẩm của bạn làm gì?\"",
      "Giới thiệu sản phẩm / hệ thống AI Agent.",
      "Mô tả cách giải pháp giải quyết vấn đề đã nêu.",
      "Demo sơ bộ hoặc mockup giao diện (nếu có)."
    ]
  },
  {
    title: "Slide 4 — USPs & Phân tích cạnh tranh",
    bullets: [
      "Trả lời câu hỏi: \"Bạn khác biệt như thế nào?\"",
      "Đối thủ / giải pháp hiện tại trên thị trường đang làm gì?",
      "Điểm mạnh và hạn chế của họ là gì?",
      "Giải pháp của bạn làm tốt hơn ở điểm nào?",
      "Lợi thế cạnh tranh cụ thể và bền vững."
    ]
  },
  {
    title: "Slide 5 — Đối tượng người dùng & User Story",
    bullets: [
      "Trả lời câu hỏi: \"Ai sẽ dùng sản phẩm của bạn?\"",
      "Persona người dùng chính (tên, tuổi, nghề nghiệp, nhu cầu).",
      "User Story: Là một [người dùng], Tôi muốn [hành động], Để [đạt được mục tiêu].",
      "Pain points cụ thể và cách sản phẩm giải quyết từng pain point."
    ]
  },
  {
    title: "Slide 6 — Luồng sử dụng (User Flow / Workflow)",
    bullets: [
      "Trả lời câu hỏi: \"Người dùng tương tác với sản phẩm như thế nào?\"",
      "Sơ đồ luồng sử dụng từ điểm bắt đầu đến kết quả cuối.",
      "Các bước tương tác chính giữa người dùng và hệ thống AI Agent.",
      "Có thể chia theo từng màn hình / chức năng nếu cần."
    ]
  },
  {
    title: "Slide 7 — Kiến trúc hệ thống (AI Agent Architecture)",
    bullets: [
      "Trả lời câu hỏi: \"Hệ thống hoạt động như thế nào bên trong?\"",
      "Sơ đồ kiến trúc tổng thể của hệ thống.",
      "Các thành phần chính và vai trò của từng thành phần.",
      "Cơ chế AI Agent: luồng xử lý, cách lập kế hoạch, ra quyết định, phản hồi.",
      "Công nghệ / framework / mô hình AI sử dụng.",
      "Cách các thành phần phối hợp với nhau."
    ]
  },
  {
    title: "Slide 8 — Demo / Prototype",
    bullets: [
      "Ảnh chụp màn hình, mockup hoặc video demo ngắn.",
      "Highlight các tính năng cốt lõi.",
      "Nếu có prototype chạy được: chuẩn bị demo trực tiếp trong phần thuyết trình."
    ]
  },
  {
    title: "Slide 9 — Tính khả thi & Lộ trình phát triển",
    bullets: [
      "Đánh giá khả năng triển khai thực tế.",
      "Thách thức kỹ thuật và cách dự kiến xử lý.",
      "Lộ trình phát triển ngắn hạn (nếu tiếp tục xây dựng)."
    ]
  },
  {
    title: "Slide 10 — Tổng kết & Kêu gọi hành động",
    bullets: [
      "Tóm tắt lại vấn đề – giải pháp – điểm khác biệt.",
      "Tầm nhìn dài hạn của sản phẩm.",
      "Câu hỏi mở để thảo luận với ban giám khảo."
    ]
  },
];

const SCORING_RUBRIC = [
  {
    title: "Tiêu chí 1 — Xác định vấn đề",
    score: 20,
    desc: "Vấn đề rõ ràng, có dữ liệu/ví dụ thực tế, pain point được phân tích sâu."
  },
  {
    title: "Tiêu chí 2 — Kiến trúc & Cơ chế AI Agent",
    score: 30,
    desc: "Kiến trúc rõ ràng, Agent thể hiện đủ 4 đặc điểm, công nghệ phù hợp và được giải thích mạch lạc."
  },
  {
    title: "Tiêu chí 3 — Tính sáng tạo & Đổi mới",
    score: 20,
    desc: "Ý tưởng độc đáo, cách tiếp cận mới, rõ điểm khác biệt so với thị trường."
  },
  {
    title: "Tiêu chí 4 — Tính khả thi & Tác động",
    score: 20,
    desc: "Có thể triển khai thực tế, tác động rõ ràng, có khả năng mở rộng."
  },
  {
    title: "Tiêu chí 5 — Chất lượng thuyết trình",
    score: 10,
    desc: "Slides rõ ràng, trình bày tự tin, trả lời câu hỏi tốt."
  },
];

const PRIZES = [
  { title: "Giải Nhất", value: "500.000 VNĐ", desc: "Kèm giấy chứng nhận & quà tặng từ nhà tài trợ.", color: "accent-blue" },
  { title: "Giải Nhì", value: "300.000 VNĐ", desc: "Kèm giấy chứng nhận & quà tặng.", color: "accent-purple" },
  { title: "Giải Ba", value: "200.000 VNĐ", desc: "Kèm giấy chứng nhận.", color: "accent-cyan" },
];

const FAQS = [
  { q: "Tôi không biết code có tham gia được không?", a: "Hoàn toàn được! Hackathon vòng này tập trung vào ý tưởng và giải pháp. Nếu bạn có tư duy sản phẩm tốt, bạn có thể đóng góp cực lớn cho đội." },
  { q: "Đội thi có bắt buộc phải có thành viên Ban Tech?", a: "Không bắt buộc, nhưng khuyến khích để đảm bảo tính khả thi về mặt kỹ thuật cho AI Agent của bạn." },
  { q: "Tôi có thể đăng ký cá nhân không?", a: "Có, BTC sẽ hỗ trợ ghép đội cho các bạn đăng ký cá nhân tại buổi Info Session." },
  { q: "AI Agent có bắt buộc phải chạy được demo không?", a: "Ở vòng Idea, demo là điểm cộng lớn (khuyến khích) nhưng không bắt buộc. Quan trọng nhất là logic và kiến trúc của Agent." },
];

const PARTNERS = [
  "OpenAI", "Google Cloud", "Anthropic", "Mistral AI", "LangChain", "AutoGPT", "CrewAI", "Hugging Face"
];

// --- Components ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-[clamp(2.5rem,5vw,4rem)] font-display font-black uppercase leading-tight mb-6 tracking-tight-custom text-gradient text-glow-primary"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-foreground/60 max-w-2xl text-lg leading-relaxed tracking-wide-custom"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="bg-background text-foreground font-sans selection:bg-white selection:text-black min-h-screen flex flex-col">

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-[60] px-6 md:px-10 h-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center pointer-events-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-4 px-6 py-3 rounded-full border border-foreground/30 hover:border-foreground transition-all bg-black/20 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-[4px]">
              <span className="w-7 h-[2px] bg-foreground transition-transform group-hover:scale-x-110 origin-left" />
              <span className="w-7 h-[2px] bg-foreground transition-transform group-hover:scale-x-90 origin-left" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Menu</span>
          </button>
        </div>

        <a href="#" className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <img src="/ITSC_white.png" alt="ITSC" className="h-[60px] md:h-[75px] object-contain" />
        </a>
        {/* commit */}

        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          <a href="#about" className="px-6 py-3 rounded-full border border-foreground/30 hover:border-foreground transition-all text-[10px] font-bold uppercase tracking-[0.25em] bg-black/20 backdrop-blur-sm">
            About Us
          </a>
          <a href="#theme" className="px-6 py-3 rounded-full border border-foreground/30 hover:border-foreground transition-all text-[10px] font-bold uppercase tracking-[0.25em] bg-black/20 backdrop-blur-sm">
            Theme
          </a>
          <a
            href="https://forms.gle/Nrr3GDFQ32cYoKtV8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-[hsl(220,70%,78%)] to-[hsl(40,80%,82%)] text-black rounded-full text-[10px] font-bold uppercase tracking-[0.25em] hover:scale-105 transition-transform"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 80px 40px)" }}
            animate={{ clipPath: "circle(150% at 80px 40px)" }}
            exit={{ clipPath: "circle(0% at 80px 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-foreground text-background flex flex-col"
          >
            <div className="px-6 md:px-10 h-20 flex items-center justify-between">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-3 rounded-full border border-background/30 hover:border-background transition-all text-background"
              >
                <X className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Close</span>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2">
                <img src="/ITSC_white.png" alt="ITSC" className="h-[60px] object-contain" />
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-20">
              <div className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.8,
                      ease: [0.25, 1, 0.5, 1]
                    }}
                    className="group flex items-center justify-between py-4 md:py-6 border-b border-background/10 transition-all"
                  >
                    <span className="text-[clamp(2rem,5vw,4.5rem)] font-normal tracking-tighter-custom uppercase group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                    <ArrowRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="px-6 md:px-10 py-10 flex justify-between items-center border-t border-background/10">
              <span className="text-background/40 text-[10px] tracking-[0.25em] uppercase font-medium">
                ITSC: AGENTIC SPARK
              </span>
              <span className="text-background/40 text-[10px] tracking-[0.25em] uppercase font-medium">
                © 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex flex-col overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-[37%_center]"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-start pt-32 px-6 pb-2 md:justify-end md:pt-0 md:px-10 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-8 md:mb-12"
          >
            <ArrowRight className="w-4 h-4 text-foreground" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground">
              ITSC: AGENTIC SPARK — 2026
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.05] tracking-tighter-custom uppercase font-black"
            >
              <span className="block">Igniting the</span>
              <span className="block">spark of AI</span>
              <span className="block font-display italic lowercase text-gradient text-glow-blue">innovation</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:max-w-xs lg:translate-y-6"
            >
              <div className="flex items-center gap-8 mb-6">
                <div className="relative w-[120px] h-[120px]">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-foreground/15"
                    />
                    <motion.circle
                      cx="60" cy="60" r="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="339.29"
                      initial={{ strokeDashoffset: 339.29 }}
                      animate={{ strokeDashoffset: 339.29 * (1 - 0.25) }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      strokeLinecap="round"
                      className="text-foreground"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-medium">25%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/40">Status</span>
                  <span className="text-sm font-bold uppercase">Registration Open</span>
                </div>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-sm tracking-wide-custom">
                Rèn tư duy sản phẩm, thực chiến AI Agent, làm bàn đạp cho những cuộc thi lớn hơn.
                Sẵn sàng trở thành "Agents of Change" cùng ITSC?
              </p>
            </motion.div>
          </div>
        </div>

        {/* Partners Marquee Bar */}
        <div className="relative z-10 bg-black/40 backdrop-blur-sm border-t border-foreground/10">
          <div className="overflow-hidden py-6">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <span key={i} className="mx-12 text-lg font-medium tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors cursor-default">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <main className="relative z-10">
        {/* About Section */}
        <section id="about" className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              title="GIỚI THIỆU CUỘC THI"
              subtitle="ITSC: AGENTIC SPARK là sân chơi hackathon nội bộ do Ban Tech ITSC tổ chức, nơi các thành viên cùng nhau khám phá và chinh phục kỷ nguyên AI Agent."
            />

            <div className="grid md:grid-cols-3 gap-6">
              {ABOUT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="liquid-glass glass-hover p-8 rounded-3xl"
                >
                  <div className="mb-6 icon-gradient">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Theme Section */}
        <section id="theme" className="relative py-32 bg-black overflow-hidden">
          {/* Fullscreen Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
            </video>
            {/* Subtle top gradient for smooth intersection */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10" />
            {/* Light overall overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 mb-10"
            >
              <div className="w-1 h-1 bg-white rounded-full" />
              <span className="text-[13px] font-medium text-white/60">
                Kỷ nguyên AI Agent bắt đầu từ <span className="text-white">2026</span>
              </span>
            </motion.div>

            {/* Heading with Gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2.5rem,8vw,4rem)] font-black leading-[1.28] mb-6 mx-auto max-w-[800px] bg-clip-text text-transparent bg-[linear-gradient(144.5deg,#FFFFFF_28%,rgba(0,0,0,0)_115%)] tracking-tight-custom py-2"
            >
              AI Agent: Agents of Change
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] font-normal text-white/70 max-w-[680px] mx-auto mb-10 leading-relaxed"
            >
              Chúng ta đang bước vào kỷ nguyên của những hệ thống không chỉ biết trả lời mà còn biết lập kế hoạch, ra quyết định và tự hành động để đạt được mục tiêu.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-20"
            >
              <a
                href="https://forms.gle/Nrr3GDFQ32cYoKtV8"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-block"
              >
                <div className="rounded-full border-[0.6px] border-white p-[1px] relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px] opacity-50" />
                  <div className="bg-white rounded-full px-[29px] py-[11px] flex items-center justify-center transition-transform group-hover:scale-[1.02]">
                    <span className="text-black text-sm font-medium uppercase tracking-widest">Đăng ký ngay</span>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Existing Content Styled for the new theme */}
            <div className="glass p-10 rounded-[40px] mb-12 text-left backdrop-blur-md bg-white/5 border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                <div className="w-2 h-8 bg-accent-blue rounded-full" />
                AI Agent là gì?
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-10">
                AI Agent là một hệ thống trí tuệ nhân tạo có khả năng nhận thức môi trường,
                sử dụng các công cụ và thực hiện các bước hành động độc lập để hoàn thành một nhiệm vụ phức tạp.
                Thay vì chỉ là một chatbot, Agent hoạt động như một "cộng sự" có tư duy.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {THEME_FEATURES.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm glass-hover"
                  >
                    <div className="mb-4 icon-gradient">{feature.icon}</div>
                    <h4 className="font-bold mb-2 text-white">{feature.title}</h4>
                    <p className="text-xs text-white/50">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-start gap-4 text-left">
              <AlertCircle className="w-6 h-6 text-accent-blue shrink-0" />
              <p className="text-sm font-medium text-white/80">
                <span className="text-accent-blue font-bold">Lưu ý:</span> Đội thi cần xây dựng ý tưởng AI Agent giải quyết bài toán thực tế, thể hiện ít nhất một trong các đặc điểm trên.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Marquee */}
        <div className="py-12 border-y border-white/5 overflow-hidden bg-black">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <span key={i} className="mx-12 text-4xl font-display italic text-foreground/20 hover:text-foreground/40 transition-colors cursor-default">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Merged Timeline & Participation Section */}
        <section id="timeline" className="py-20 px-6 font-sans">
          <div className="max-w-7xl mx-auto relative min-h-[850px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-[850px]">
              {/* Left Panel - Vertical Timeline Accordion */}
              <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center">
                <h2 className="text-5xl lg:text-6xl tracking-[-0.05em] text-white font-black mb-12">
                  Lộ trình <br />
                  <span className="font-display italic text-white/80 text-glow-blue">thi đấu AI Agent</span>
                </h2>

                <div className="space-y-4 w-full max-w-xl">
                  {TIMELINE.map((phase, index) => (
                    <div
                      key={index}
                      className={`liquid-glass glass-hover rounded-[2rem] overflow-hidden transition-all duration-500 ${activePhase === index ? 'ring-1 ring-white/30 bg-white/10' : ''
                        }`}
                    >
                      <button
                        onClick={() => setActivePhase(index)}
                        className="w-full p-6 lg:p-8 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${activePhase === index ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white/20'
                            }`}>
                            <div className={activePhase === index ? "" : "icon-gradient"}>
                              {React.cloneElement(phase.icon as React.ReactElement, { className: "w-6 h-6" })}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
                              {phase.phase} — {phase.date}
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
                              {phase.title}
                            </h3>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 ${activePhase === index ? 'rotate-180 text-white' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {activePhase === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                          >
                            <div className="px-8 pb-8 pt-0">
                              <div className="h-px bg-white/10 mb-6" />
                              <ul className="space-y-4">
                                {phase.items.map((item, i) => (
                                  <li key={i} className="text-sm text-white/60 leading-relaxed flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel - Participation Details */}
              <div className="w-full lg:w-[45%] p-8 lg:p-16 flex flex-col justify-end">
                {/* Info Card */}
                <div className="liquid-glass glass-hover p-10 rounded-[2.5rem] mb-8">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white">Điều kiện tham gia</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Tham gia hệ sinh thái AI Agent lớn nhất năm của ITSC. Kết nối và tỏa sáng cùng những bộ óc sáng tạo nhất trong cộng đồng công nghệ.
                  </p>
                </div>

                {/* Participation Grid */}
                <div className="liquid-glass glass-hover p-6 rounded-[3rem]">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="liquid-glass glass-hover p-6 rounded-[2rem]">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 icon-gradient">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-white">Quy mô đội</h4>
                      <p className="text-[10px] text-white/50">1 – 4 thành viên</p>
                    </div>
                    <div className="liquid-glass glass-hover p-6 rounded-[2rem]">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 icon-gradient">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-white">Bài nộp</h4>
                      <p className="text-[10px] text-white/50">Tài liệu dự thi chuẩn</p>
                    </div>
                  </div>
                  <div className="liquid-glass glass-hover p-6 rounded-[2rem] flex items-center gap-6">
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-white/5 shrink-0">
                      <img src="https://picsum.photos/seed/ai-agent/200/150" alt="AI" className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-white">Đối tượng</h4>
                      <p className="text-[10px] text-white/50">Thành viên CLB ITSC</p>
                    </div>
                    <a
                      href="https://forms.gle/Nrr3GDFQ32cYoKtV8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section id="deliverables" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              title="TÀI LIỆU CẦN CHUẨN BỊ"
              subtitle="Mỗi đội cần nộp bộ tài liệu đầy đủ để BTC đánh giá tiềm năng của ý tưởng."
            />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="liquid-glass glass-hover p-10 rounded-[40px]">
                <h3 className="text-2xl font-bold mb-4">Pitch Deck (bắt buộc)</h3>
                <p className="text-foreground/60 mb-6 tracking-wide-custom">Slides trình bày ý tưởng theo cấu trúc quy định của BTC.</p>
                <div className="text-xs font-bold tracking-widest uppercase text-accent-blue">
                  10 - 15 Slides
                </div>
              </div>
              <div className="liquid-glass glass-hover p-10 rounded-[40px]">
                <h3 className="text-2xl font-bold mb-4">Document mô tả (khuyến khích)</h3>
                <p className="text-foreground/60 mb-6 tracking-wide-custom">Chi tiết kỹ thuật, user flow, kiến trúc hệ thống và các tài liệu bổ trợ khác.</p>
                <div className="text-xs font-bold tracking-widest uppercase text-accent-purple">
                  Technical Detail
                </div>
              </div>
            </div>

            <div className="text-center p-6 liquid-glass rounded-2xl inline-block mx-auto">
              <span className="text-sm font-medium">Thời gian thuyết trình: <span className="text-accent-cyan font-bold">20 phút/đội</span></span>
            </div>
          </div>
        </section>

        {/* Pitch Deck Structure */}
        <section className="py-32 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading
              title="CẤU TRÚC PITCH DECK"
              subtitle="Thời gian thuyết trình: 20 phút/đội. Slides nên gọn, súc tích, trực quan (Khuyến nghị: 10 – 15 slides)."
            />

            <div className="space-y-4">
              {PITCH_DECK_STRUCTURE.map((item, i) => (
                <div key={i} className="liquid-glass glass-hover rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-foreground/30">SLIDE {i + 1}</span>
                      <span className="text-lg font-bold">{item.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6"
                      >
                        <ul className="space-y-2 border-t border-white/5 pt-4">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm text-foreground/60 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scoring Section */}
        <section id="scoring" className="relative py-32 overflow-hidden bg-[#010101]">
          {/* Video Background */}
          <div className="absolute bottom-0 left-0 w-full z-10 -mt-[150px] pointer-events-none opacity-50">
            <HlsVideo
              src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
              fallback="/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[clamp(2.5rem,5vw,5rem)] font-display font-black uppercase leading-tight mb-6 tracking-tighter-custom text-primary-gradient text-glow-primary"
              >
                Tiêu chuẩn Đánh giá
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed tracking-wide-custom"
              >
                Tổng điểm: 100. BTC đánh giá dựa trên 5 tiêu chí cốt lõi để tìm ra những ý tưởng đột phá nhất.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {SCORING_RUBRIC.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="liquid-glass glass-hover p-8 rounded-3xl flex flex-col border border-white/5"
                >
                  <div className="text-4xl font-display italic mb-4 text-primary-gradient">{item.score}</div>
                  <h4 className="font-bold mb-3 leading-tight">{item.title}</h4>
                  <p className="text-xs text-foreground/50 mt-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6 bg-black">
          <div className="max-w-[1400px] mx-auto relative overflow-hidden rounded-[3rem] border border-white/10 bg-[hsl(249,18%,95%)] text-[#1a1a1a] min-h-[800px] flex items-stretch shadow-2xl">

            {/* Content Container (Left Side) */}
            <div className="relative z-10 w-full lg:w-[55%] p-12 lg:p-20 flex flex-col justify-center">
              <div className="max-w-2xl">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tight-custom leading-tight mb-8 text-[#1a1a1a] whitespace-nowrap">
                  Giải đáp<span className="text-[#f97316] italic font-display ml-2 tracking-tighter text-glow-orange">thắc mắc</span>
                </h2>
                <p className="text-lg lg:text-xl text-[#4b5563] mb-12 leading-relaxed max-w-xl">
                  Mọi thông tin bạn cần biết về lộ trình, quy định và cách thức tham gia AI Agentic Spark 2026.
                </p>

                <div className="space-y-8 mb-12">
                  {FAQS.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <h4 className="text-lg font-bold mb-2 flex items-start gap-3 text-[#1a1a1a]">
                        <span className="text-[#f97316]">Q.</span>
                        {faq.q}
                      </h4>
                      <p className="text-base text-[#4b5563] leading-relaxed pl-7">
                        {faq.a}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#register"
                    className="px-8 py-4 bg-[#f97316] text-white rounded-full font-medium hover:bg-[#ea580c] transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
                  >
                    Tham gia ngay
                  </a>
                  <a
                    href="https://m.me/itsc.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-[#e5e7eb] text-[#1a1a1a] rounded-full font-medium hover:bg-white transition-all hover:scale-105"
                  >
                    Liên hệ hỗ trợ
                  </a>
                </div>
              </div>
            </div>

            {/* Video (Right Side) */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-[50%] h-[90%] hidden lg:block pointer-events-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain mix-blend-multiply"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_192508_4eecde4c-f835-4f4b-b255-eafd1156da99.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="p-10 rounded-[40px] liquid-glass glass-hover bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/20 blur-[60px] rounded-full" />

              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="icon-gradient">
                  <AlertCircle className="w-6 h-6 text-accent-blue" />
                </div>
                Lưu ý quan trọng
              </h3>

              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Hạn nộp tài liệu</p>
                    <p className="text-sm text-foreground/60">BTC thông báo qua Discord trước 13/04.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Định dạng slides</p>
                    <p className="text-sm text-foreground/60">PDF hoặc Google Slides (chia sẻ link).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Ngôn ngữ</p>
                    <p className="text-sm text-foreground/60">Tiếng Việt hoặc Tiếng Anh đều được.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Câu hỏi</p>
                    <p className="text-sm text-foreground/60">Liên hệ BTC qua Discord hoặc Fanpage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prize Section (Vòng Idea) */}
        <section id="prizes" className="py-16 px-6 bg-black">
          <div className="relative max-w-[1400px] mx-auto rounded-[4rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-[120%] h-[110%] absolute -top-[15%] left-1/2 -translate-x-1/2 object-cover object-center opacity-60"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Blurred Background Element Removed to fix horizontal cut glitch */}

            {/* Bottom Blur Overlay */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none backdrop-blur-[12px]" /> */}

            {/* Content Container */}
            <div className="relative z-20 w-full pt-20 pb-0 px-6 flex flex-col items-center text-center scale-[0.75] origin-top -mb-[120px] md:-mb-[180px]">
              {/* Heading Block */}
              <div className="flex flex-col gap-[10px] mb-12 max-w-[871px]">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[clamp(2.5rem,5vw,76px)] font-sans font-black tracking-[-2px] leading-[1.3] py-2 uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-gradient-from via-primary-gradient-via to-primary-gradient-to text-glow-primary"
                >
                  CƠ CẤU GIẢI THƯỞNG
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[clamp(2.5rem,5vw,76px)] font-display italic font-black tracking-[-2px] leading-[1.3] py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-gradient-from via-primary-gradient-via to-primary-gradient-to text-glow-primary"
                >
                  (VÒNG IDEA)
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[#f6f7f9]/90 text-lg max-w-[613px] mx-auto leading-[26px] mt-4"
                >
                  Phần thưởng xứng đáng cho những ý tưởng AI Agent đột phá và có tính thực tiễn cao nhất tại ITSC 2026.
                </motion.p>
              </div>

              {/* Podium Display */}
              <div className="relative w-full max-w-[1163px] mx-auto -mt-6">
                <div className="liquid-glass backdrop-blur-[16px] bg-black/5 border border-white/10 rounded-[24px] p-[22.5px] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                  <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 pt-12 pb-8">

                    {/* 2nd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col items-center w-full md:w-1/3 order-2 md:order-1 group cursor-default"
                    >
                      <div className="mb-6 flex flex-col items-center transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-accent-purple/40 flex items-center justify-center mb-4 border border-accent-purple/60 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] group-hover:bg-accent-purple/60 transition-all">
                          <Trophy className="w-8 h-8 text-accent-purple" />
                        </div>
                        <div className="text-2xl font-display italic text-accent-purple group-hover:font-bold transition-all">Giải Nhì</div>
                        <div className="text-4xl font-bold text-white mt-2">300.000 VNĐ</div>
                        <div className="text-sm text-white/40 mt-2 text-center max-w-[200px]">Kèm giấy chứng nhận & quà tặng.</div>
                      </div>
                      <div className="w-full h-32 md:h-48 bg-gradient-to-t from-accent-purple/20 to-accent-purple/40 rounded-t-2xl border-x border-t border-accent-purple/30 flex items-center justify-center transition-all duration-300 group-hover:from-accent-purple/40 group-hover:to-accent-purple/60">
                        <span className="text-6xl font-display text-accent-purple/30 group-hover:text-accent-purple/70 transition-colors">2</span>
                      </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col items-center w-full md:w-1/3 z-10 order-1 md:order-2 group cursor-default"
                    >
                      <div className="mb-8 flex flex-col items-center transition-all duration-300">
                        <div className="w-24 h-24 rounded-full bg-accent-blue/40 flex items-center justify-center mb-4 border border-accent-blue/60 shadow-[0_0_60px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_80px_rgba(59,130,246,0.7)] group-hover:bg-accent-blue/60 transition-all">
                          <Trophy className="w-12 h-12 text-accent-blue" />
                        </div>
                        <div className="text-3xl font-display italic text-accent-blue group-hover:font-bold transition-all">Giải Nhất</div>
                        <div className="text-5xl font-bold text-white mt-2">500.000 VNĐ</div>
                        <div className="text-sm text-white/60 mt-2 text-center max-w-[240px]">Kèm giấy chứng nhận & quà tặng từ nhà tài trợ.</div>
                      </div>
                      <div className="w-full h-48 md:h-72 bg-gradient-to-t from-accent-blue/30 to-accent-blue/50 rounded-t-2xl border-x border-t border-accent-blue/40 flex items-center justify-center shadow-[0_-20px_60px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:from-accent-blue/40 group-hover:to-accent-blue/70">
                        <span className="text-8xl font-display text-accent-blue/40 group-hover:text-accent-blue/80 transition-colors">1</span>
                      </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center w-full md:w-1/3 order-3 group cursor-default"
                    >
                      <div className="mb-6 flex flex-col items-center transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-accent-cyan/40 flex items-center justify-center mb-4 border border-accent-cyan/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] group-hover:bg-accent-cyan/60 transition-all">
                          <Trophy className="w-8 h-8 text-accent-cyan" />
                        </div>
                        <div className="text-2xl font-display italic text-accent-cyan group-hover:font-bold transition-all">Giải Ba</div>
                        <div className="text-4xl font-bold text-white mt-2">200.000 VNĐ</div>
                        <div className="text-sm text-white/40 mt-2 text-center max-w-[200px]">Kèm giấy chứng nhận.</div>
                      </div>
                      <div className="w-full h-24 md:h-32 bg-gradient-to-t from-accent-cyan/20 to-accent-cyan/40 rounded-t-2xl border-x border-t border-accent-cyan/30 flex items-center justify-center transition-all duration-300 group-hover:from-accent-cyan/30 group-hover:to-accent-cyan/50">
                        <span className="text-5xl font-display text-accent-cyan/30 group-hover:text-accent-cyan/60 transition-colors">3</span>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Cinematic Version */}
        <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#002633]">
          {/* Section Transition Blur Gradient */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content Container */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 py-[90px] flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-8xl leading-[1.1] pb-2 tracking-[-2.46px] font-display font-black uppercase mb-8 relative z-30"
            >
              Sẵn sàng trở thành <br />
              <span className="text-muted-foreground text-glow-blue">“Agents of Change”</span> <br />
              cùng ITSC?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed mb-12"
            >
              Đừng bỏ lỡ cơ hội tham gia sân chơi AI Agent lớn nhất năm của ITSC.
              Chúng tôi đang tìm kiếm những bộ óc sáng tạo, những người dám nghĩ dám làm để cùng nhau định hình tương lai.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              <a
                href="https://forms.gle/Nrr3GDFQ32cYoKtV8"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] transition-transform cursor-pointer font-medium uppercase tracking-widest"
              >
                Đăng ký tham gia ngay
              </a>

              <div className="flex flex-wrap justify-center gap-8 mt-4">
                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">itsc.fptu@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">facebook.com/itsc.fptu</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">Discord Community</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Transition Blur Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm font-bold tracking-tighter">
            ITSC: AGENTIC SPARK
          </div>
          <div className="text-xs text-foreground/40 font-medium tracking-[0.2em] uppercase text-center">
            Rèn tư duy, thực chiến AI Agent.
          </div>
          <div className="text-xs text-foreground/40">
            © 2026 ITSC Club. All rights reserved.
          </div>
        </div>
      </footer>

      {/* SVG Gradient Definition for Icons */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="icon-gradient-def" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
