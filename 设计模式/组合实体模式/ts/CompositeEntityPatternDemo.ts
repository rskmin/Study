import Client from "./Client";

const client = new Client()
client.setData('Test', 'Data')
client.printData()
client.setData('Second Test', 'Data1')
client.printData()