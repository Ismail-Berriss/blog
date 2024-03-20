export default class Post {
  static count = 0;

  constructor(name, title, content, image) {
    this.id = Post.count++;
    this.name = name;
    this.title = title;
    this.content = content;
    this.image = image;
    this.timestamp = new Date().toDateString();
  }
}
