import githubStyle from "@/styles/github.css?raw";
import newspaperStyle from "@/styles/newspaper.css?raw";
import posterStyle from "@/styles/poster.css?raw";
import slimStyle from "@/styles/slim.css?raw";
import noteStyle from "@/styles/note.css?raw";
import twStyle from "@/styles/thoughtworks.css?raw";
import footnoteStyle from "@/styles/footnotes.css?raw";

export const markdownStyles = [
  { name: "github", css: githubStyle + footnoteStyle },
  { name: "newspaper", css: newspaperStyle + footnoteStyle },
  { name: "poster", css: posterStyle + footnoteStyle },
  { name: "slim", css: slimStyle + footnoteStyle },
  { name: "note", css: noteStyle + footnoteStyle },
  { name: "tw", css: twStyle + footnoteStyle },
];

export const loadCSS: any = (name: string) =>
  markdownStyles.find((style) => style.name === name)?.css;
