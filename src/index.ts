import './css/main.css'
import renderer from './utils/renderer';

import Inventory from './classes/InventoryClass';
import Order from './classes/OrderClass';

const inventory = new Inventory();
inventory.listAllItems();


const order = new Order();
order.refreshCart();
order.eventListener();


renderer();






