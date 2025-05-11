
declare module 'tagcloud' {
    interface TagCloudOptions {
      radius?: number;
      maxSpeed?: 'slow' | 'normal' | 'fast';
      initSpeed?: 'slow' | 'normal' | 'fast';
      direction?: number;
      keep?: boolean;
    }
  
    type TagCloud = (
      container: HTMLElement | string,
      texts: string[],
      options?: TagCloudOptions
    ) => void;
  
    const TagCloud: TagCloud;
    export default TagCloud;
  }