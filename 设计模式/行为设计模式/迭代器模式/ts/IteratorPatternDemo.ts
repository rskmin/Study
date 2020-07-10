import NameRepository from "./NameRepository";

const nameRepository: NameRepository = new NameRepository()

for (let iter = nameRepository.getIterator(); iter.hasNext();) {
  console.log(`Name : ${iter.next()}`)
}