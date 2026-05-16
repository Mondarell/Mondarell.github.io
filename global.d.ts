// 声明 CSS 模块的类型
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}