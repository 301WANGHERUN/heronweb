import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">About Me</h1>
      <div className="prose">
        <p>
          I&apos;m a software developer passionate about building great web
          experiences. This blog is where I share what I learn about React,
          TypeScript, and modern web development.
        </p>
        <p>
          When I&apos;m not coding, you can find me reading about distributed
          systems, contributing to open source, or exploring new technologies.
        </p>
        <h2>Contact</h2>
        <ul>
          <li>GitHub:{" "}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              @username
            </a>
          </li>
          <li>Twitter:{" "}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              @username
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
