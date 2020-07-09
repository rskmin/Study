import FilterManager from './FilterManager'
import Target from './Target'
import AuthenticationFilter from './AuthenticaltionFilter'
import DebugFilter from './DebugFilter'
import Client from './Client'

const filterManager: FilterManager = new FilterManager(new Target())
filterManager.setFilter(new AuthenticationFilter())
filterManager.setFilter(new DebugFilter())

const client: Client = new Client()
client.setFilterManager(filterManager)
client.sendRequest('Home')