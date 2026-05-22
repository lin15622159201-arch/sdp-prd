import mitt, { Emitter } from 'mitt';
import { IEvents } from './type';

const emitter: Emitter<IEvents> = mitt<IEvents>();

export default emitter;
