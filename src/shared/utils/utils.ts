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
