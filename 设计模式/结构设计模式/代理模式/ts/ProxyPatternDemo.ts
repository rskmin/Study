import Image from './Image'
import ProxyImage from "./ProxyImage";

const image: Image = new ProxyImage('test_10mb.jpg')

image.display()
console.log()
image.display()