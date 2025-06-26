declare namespace JSX {
  interface IntrinsicElements {
    "healcode-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      "data-version"?: string;
      "data-link-class"?: string;
      "data-site-id"?: string;
      "data-mb-site-id"?: string;
      "data-service-id"?: string;
      "data-bw-identity-site"?: string;
      "data-type"?: string;
      "data-inner-html"?: string;
    };
  }
} 