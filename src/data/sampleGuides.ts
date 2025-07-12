export interface Comment {
  user: string;
  comment: string;
  timestamp: Date;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  authors: string[];
  comments: Comment[];
  views?: number;
  duration?: string;
  likes?: number;
  thumbnail?: string;
  tags?: string[];
  createdAt?: string;
}

export const sampleGuides: Guide[] = [
  {
    id: "1",
    title: "Complete React.js Tutorial for Beginners",
    content: "Learn Resddasdadsaact.js from scratch with this comprehensive tutorial. We'll cover components, state management, hooks, and building your first React application. This guide includes hands-on examples and real-world projects to help you master React development.",
    authors: ["John Doe", "Jane Smith"],
    views: 15420,
    duration: "45 min",
    likes: 892,
    tags: ["React", "JavaScript", "Frontend", "Beginner"],
    createdAt: "2024-01-15",
    thumbnail: "/assets/Complete React.js Tutorial for Beginners.jpg",
    comments: [
      {
        user: "CodeLearner123",
        comment: "Excellent tutorial! Really helped me understand React hooks.",
        timestamp: new Date("2024-01-16")
      },
      {
        user: "DevStudent",
        comment: "Great examples and clear explanations. Thank you!",
        timestamp: new Date("2024-01-17")
      }
    ]
  },
  {
    id: "2",
    title: "Node.js API Development with Express",
    content: "Build scalable RESTful APIs using Node.js and Express.js. This tutorial covers routing, middleware, authentication, database integration, and best practices for API development. Perfect for backend developers looking to enhance their skills.",
    authors: ["Mike Johnson"],
    views: 8750,
    duration: "60 min",
    likes: 456,
    tags: ["Node.js", "Express", "Backend", "API", "Intermediate"],
    createdAt: "2024-01-10",
    thumbnail: "/assets/Node.js API Development with Express.jpg",
    comments: [
      {
        user: "BackendDev",
        comment: "Comprehensive coverage of Express.js. Love the middleware explanations.",
        timestamp: new Date("2024-01-11")
      }
    ]
  },
  {
    id: "3",
    title: "JavaScript ES6+ Features You Must Know",
    content: "Explore modern JavaScript features including arrow functions, destructuring, async/await, modules, and more. This guide will help you write cleaner, more efficient JavaScript code using the latest ES6+ syntax and features.",
    authors: ["Sarah Wilson", "Alex Chen"],
    views: 12300,
    duration: "35 min",
    likes: 678,
    tags: ["JavaScript", "ES6", "Modern JS", "Intermediate"],
    createdAt: "2024-01-08",
    thumbnail: "/assets/JavaScript ES6+ Features You Must Know.jpg",
    comments: [
      {
        user: "JSNinja",
        comment: "Finally understand destructuring! Great examples.",
        timestamp: new Date("2024-01-09")
      },
      {
        user: "WebDeveloper",
        comment: "The async/await section was particularly helpful.",
        timestamp: new Date("2024-01-10")
      }
    ]
  },
  {
    id: "4",
    title: "MongoDB Database Design and Operations",
    content: "Master MongoDB database design, queries, and operations. Learn about collections, documents, indexing, aggregation pipelines, and how to integrate MongoDB with your applications. Includes practical examples and best practices.",
    authors: ["David Brown"],
    views: 6890,
    duration: "50 min",
    likes: 234,
    tags: ["MongoDB", "Database", "NoSQL", "Backend"],
    createdAt: "2024-01-05",
    thumbnail: "/assets/MongoDB Database Design and Operations.jpg",
    comments: [
      {
        user: "DatabaseAdmin",
        comment: "Great introduction to MongoDB. The aggregation examples were excellent.",
        timestamp: new Date("2024-01-06")
      }
    ]
  },
  {
    id: "5",
    title: "Tailwind CSS: Utility-First Styling",
    content: "Learn how to build beautiful, responsive user interfaces using Tailwind CSS. This guide covers utility classes, responsive design, custom configurations, and component patterns. Transform your CSS workflow with this modern approach.",
    authors: ["Emma Davis", "Tom Rodriguez"],
    views: 9450,
    duration: "40 min",
    likes: 567,
    tags: ["Tailwind CSS", "CSS", "Frontend", "Design", "Responsive"],
    createdAt: "2024-01-03",
    thumbnail: "/assets/Tailwind.jpg",
    comments: [
      {
        user: "UIDesigner",
        comment: "Tailwind has changed how I approach CSS. Thanks for the great tutorial!",
        timestamp: new Date("2024-01-04")
      }
    ]
  },
  {
    id: "6",
    title: "Full-Stack Development with MERN Stack",
    content: "Build complete web applications using MongoDB, Express.js, React.js, and Node.js. This comprehensive guide takes you through the entire development process from backend API creation to frontend implementation and deployment.",
    authors: ["Lisa Garcia", "Kevin Park", "Rachel Kim"],
    views: 18750,
    duration: "90 min",
    likes: 1245,
    tags: ["MERN", "Full-Stack", "React", "Node.js", "MongoDB", "Advanced"],
    createdAt: "2024-01-01",
    thumbnail: "/assets/Full-Stack Development with MERN Stack.jpg",
    comments: [
      {
        user: "FullStackDev",
        comment: "Amazing comprehensive tutorial! Covered everything I needed to know.",
        timestamp: new Date("2024-01-02")
      },
      {
        user: "WebDeveloper2024",
        comment: "The deployment section was particularly useful. Great work!",
        timestamp: new Date("2024-01-03")
      }
    ]
  }
];