import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function processContentForParagraphs(content: string): string {
  if (!content) return content;
  
  // Handle content that's already in HTML format
  if (content.includes('<p>') || content.includes('<div>')) {
    // If it already has paragraph tags, process the text content within them
    return content.replace(/>([^<]+)</g, (match, textContent) => {
      const processed = processTextForParagraphs(textContent);
      return match.replace(textContent, processed);
    });
  }
  
  // For plain text content, wrap in paragraphs and process
  const processed = processTextForParagraphs(content);
  return `<div>${processed}</div>`;
}

function processTextForParagraphs(text: string): string {
  // Common abbreviations that shouldn't trigger paragraph breaks
  const abbreviations = /\b(Dr|Mr|Mrs|Ms|Prof|vs|etc|i\.e|e\.g|Inc|Ltd|Corp|Co|St|Ave|Blvd|Rd|Jr|Sr|Ph\.D|M\.D|B\.A|M\.A|U\.S|U\.K|N\.Y|L\.A)\./gi;
  
  // URLs and email patterns that shouldn't be broken
  const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  
  // Decimal numbers that shouldn't be broken
  const decimalPattern = /\d+\.\d+/g;
  
  // Store patterns to preserve them
  const preservedPatterns: string[] = [];
  let processedText = text;
  
  // Replace patterns with placeholders
  processedText = processedText.replace(abbreviations, (match) => {
    const index = preservedPatterns.length;
    preservedPatterns.push(match);
    return `__PRESERVED_${index}__`;
  });
  
  processedText = processedText.replace(urlPattern, (match) => {
    const index = preservedPatterns.length;
    preservedPatterns.push(match);
    return `__PRESERVED_${index}__`;
  });
  
  processedText = processedText.replace(decimalPattern, (match) => {
    const index = preservedPatterns.length;
    preservedPatterns.push(match);
    return `__PRESERVED_${index}__`;
  });
  
  // Split on periods followed by space and capital letter (sentence endings)
  processedText = processedText.replace(/\.\s+([A-Z])/g, '.</p><p>$1');
  
  // Also handle periods at end of text
  processedText = processedText.replace(/\.\s*$/g, '.</p>');
  
  // Wrap in paragraph tags if not already wrapped
  if (!processedText.startsWith('<p>')) {
    processedText = '<p>' + processedText;
  }
  if (!processedText.endsWith('</p>')) {
    processedText = processedText + '</p>';
  }
  
  // Restore preserved patterns
  preservedPatterns.forEach((pattern, index) => {
    processedText = processedText.replace(`__PRESERVED_${index}__`, pattern);
  });
  
  return processedText;
}
