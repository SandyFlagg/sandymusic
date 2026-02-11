export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  slug: string;
  content: string; // HTML string for now
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Upload Your First Track to SoundCloud",
    excerpt: "Ready to share your music with the world? Here is a step-by-step guide to uploading your first track to SoundCloud and getting it heard.",
    date: "November 28, 2025",
    readTime: "5 min read",
    author: {
      name: "Sandy Flagg",
      avatar: "/images/sandy-author.jpg",
      role: "Admin",
      bio: "Music producer and DJ sharing knowledge with the community.",
    },
    category: "Production",
    tags: ["SoundCloud", "Distribution", "Music Production"],
    imageUrl: "https://picsum.photos/seed/soundcloud/800/400",
    slug: "how-to-upload-to-soundcloud",
    content: `
      <h2 id="getting-started">Getting Started with SoundCloud</h2>
      <p>SoundCloud remains one of the most vital platforms for independent artists in 2025. It's not just a streaming service; it's a community where careers are born. Whether you're a bedroom producer, a touring DJ, or a vocalist looking for collaboration, getting your tracks online is the first step to building a dedicated audience.</p>
      
      <p>But simply uploading a file isn't enough. To stand out in a sea of millions of tracks, you need to optimize every aspect of your release. This guide will walk you through the process of uploading your first track the right way.</p>

      <h3 id="step-1">Step 1: Prepare Your Audio File</h3>
      <p>Quality matters. Before you even log in, ensure your track is ready for the world.</p>
      <ul>
        <li><strong>Format:</strong> Always upload lossless files like WAV, FLAC, or AIFF. SoundCloud will transcode them for streaming, but starting with the highest quality source ensures the best possible listening experience.</li>
        <li><strong>Mastering:</strong> Ensure your track is mastered to competitive loudness levels (usually around -14 LUFS for streaming, though SoundCloud can handle louder masters). No clipping!</li>
        <li><strong>Metadata:</strong> Have your track title, artist name, and ISRC code (if you have one) ready.</li>
      </ul>

      <h3 id="step-2">Step 2: Create and Optimize Your Profile</h3>
      <p>Your profile is your brand. If you haven't already, sign up and take some time to make it look professional.</p>
      <ul>
        <li><strong>Profile Picture:</strong> Use a high-resolution image that represents you or your artist brand.</li>
        <li><strong>Header Image:</strong> This is prime real estate. Use it to promote your latest release or show a cool live shot.</li>
        <li><strong>Bio:</strong> Write a concise bio. Who are you? What kind of music do you make? Include a contact email for booking or inquiries.</li>
      </ul>

      <h3 id="step-3">Step 3: The Upload Process</h3>
      <p>Click the "Upload" button in the top navigation bar. You can drag and drop your file directly into the window.</p>
      
      <h4 id="title-and-url">Title and URL</h4>
      <p>Keep your title clean. Avoid things like "My Song (FINAL MASTER v3)". Just use "Artist Name - Track Title". You can also customize the URL slug to make it easier to share (e.g., <code>soundcloud.com/yourname/track-title</code>).</p>

      <h4 id="genre-and-tags">Genre and Tags</h4>
      <p>This is crucial for discovery. Select the most accurate main genre. Then, use the tagging section to add sub-genres and moods. For example, if you're uploading a House track, tags could include: <code>#DeepHouse</code>, <code>#TechHouse</code>, <code>#SummerVibes</code>, <code>#Club</code>.</p>

      <h4 id="description">Description</h4>
      <p>Tell the story of the track. Who did you collaborate with? What inspired it? Include lyrics if it's a vocal track. Most importantly, include <strong>Call-to-Actions (CTAs)</strong>: "Follow me on Instagram," "Download for free here," or "Spotify link in bio."</p>

      <h3 id="step-4">Step 4: Artwork</h3>
      <p>Don't use a blurry photo. Your artwork is the first thing people see. Use a 1000x1000px (minimum) square image. It should be striking and legible even at small sizes on mobile screens.</p>

      <h3 id="step-5">Step 5: Privacy and Sharing</h3>
      <p>You can choose to make your track <strong>Public</strong> immediately or <strong>Private</strong> if you want to share it with specific people (like labels or blogs) before the official release. Private links are great for demos.</p>

      <h3 id="step-6">Step 6: Promotion</h3>
      <p>Once you hit save, the work isn't done.</p>
      <ul>
        <li><strong>Share on Socials:</strong> Create short video clips (Reels, TikToks) using your track's audio.</li>
        <li><strong>Engage:</strong> Reply to every comment you get on SoundCloud. Build a relationship with your listeners.</li>
        <li><strong>Submit to Repost Channels:</strong> Reach out to SoundCloud repost networks in your genre to get your track in front of more ears.</li>
      </ul>

      <p>Consistency is key. Don't be discouraged if your first upload doesn't go viral. Keep creating, keep uploading, and keep engaging with the community. Good luck!</p>
    `,
  },
];
