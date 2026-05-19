const fs = require('fs');
const path = require('path');

const files = [
  "src/pages/Courses/Courses.jsx",
  "src/pages/Courses/CourseDetails.jsx",
  "src/pages/Courses/WatchCourse.jsx",
  "src/pages/Dashboard/Dashboard.jsx",
  "src/pages/Dashboard/Home.jsx",
  "src/pages/Admin/AdminOverview.jsx",
  "src/pages/Admin/AdminCourses.jsx",
  "src/pages/Admin/AdminUsers.jsx",
  "src/pages/Admin/AdminAnalytics.jsx",
  "src/pages/Admin/AdminSettings.jsx"
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}, not found.`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // AdminOverview and CourseDetails specific brand- colors
  content = content.replace(/bg-brand-950(\/\d+)?/g, "bg-neutral-50 dark:bg-neutral-950");
  content = content.replace(/bg-brand-900(\/\d+)?/g, "bg-white dark:bg-neutral-900");
  content = content.replace(/border-white\/(5|10|20)/g, "border-neutral-200 dark:border-neutral-800");
  content = content.replace(/text-brand-100\/\d+/g, "text-neutral-500 dark:text-neutral-400");
  
  // Convert standard primary text: text-white or dark:text-white -> text-neutral-900 dark:text-neutral-50
  // Exclude buttons or tooltips that explicitly use text-white on dark backgrounds
  content = content.replace(/bg-neutral-900 text-white/g, "bg-neutral-900 __TEXT_WHITE_KEEP__");
  content = content.replace(/bg-primary-600 text-white/g, "bg-primary-600 __TEXT_WHITE_KEEP__");
  content = content.replace(/dark:bg-white dark:text-black/g, "dark:bg-white __DARK_TEXT_BLACK_KEEP__");
  content = content.replace(/dark:bg-white dark:text-neutral-900/g, "dark:bg-white __DARK_TEXT_NEUTRAL_900_KEEP__");
  
  // Now replace text-white
  content = content.replace(/\btext-white\b(?!\/)/g, "text-neutral-900 dark:text-neutral-50");
  content = content.replace(/\bdark:text-white\b/g, "dark:text-neutral-50");
  
  // Restore excluded
  content = content.replace(/__TEXT_WHITE_KEEP__/g, "text-white");
  content = content.replace(/__DARK_TEXT_BLACK_KEEP__/g, "dark:text-black");
  content = content.replace(/__DARK_TEXT_NEUTRAL_900_KEEP__/g, "dark:text-neutral-900");

  // Fix doubles
  content = content.replace(/(text-neutral-900 dark:text-neutral-50 )+/g, "text-neutral-900 dark:text-neutral-50 ");

  // Secondary text normalization
  content = content.replace(/\bdark:text-neutral-400\b/g, "dark:text-neutral-400"); 
  content = content.replace(/\btext-neutral-500 dark:text-neutral-400\b/g, "text-neutral-500 dark:text-neutral-400"); 

  // WatchCourse had dark:text-neutral-100
  content = content.replace(/\bdark:text-neutral-100\b/g, "dark:text-neutral-50");

  // Replace any existing gray- with neutral-
  content = content.replace(/\bgray-(\d+)\b/g, "neutral-$1");

  // Border standardizations: border-neutral-100 dark:border-neutral-800 -> border-neutral-200 dark:border-neutral-800
  content = content.replace(/\bborder-neutral-100\b/g, "border-neutral-200");
  content = content.replace(/\bdark:border-neutral-700\b/g, "dark:border-neutral-800");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
