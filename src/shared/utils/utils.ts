import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Styles

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converters

export const convertFileToBase64 = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();

  return Buffer.from(bytes).toString('base64');
};

// Logger

export const logger = (error: unknown) => {
  const date = new Date();
  const errorDate = date.toLocaleString('uk', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  if (error instanceof Error) {
    const errorString = `${errorDate} ${error.name}: ${error.message}`;
    console.log(errorString);
  } else {
    console.log(error);
  }
};

// ImageKit Transform

export const resizeImage = (
  src: string,
  option: { width: number; height?: number },
): string => {
  const isIncludeSearchParams = src.lastIndexOf('?') !== -1;
  const transformQuery = `${isIncludeSearchParams ? '&' : '?'}tr=w-${
    option.width
  }${option.height ? `,h-${option.height}` : ''}`;

  return src + transformQuery;
};

// Date

export const shortTime = new Intl.DateTimeFormat('en', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const shortDate = new Intl.DateTimeFormat('en', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});


export const formatDateTimeAttrDate = (date:Date):string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}-${month}-${day}`
}
