import mitt, { Emitter } from 'mitt';
import { IEvents } from './type';

export { EVENT_BUS_ENUM } from './constant';

const emitter: Emitter<IEvents> = mitt<IEvents>();

export default emitter;
