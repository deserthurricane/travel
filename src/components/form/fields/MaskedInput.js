import { TextInputMask } from 'react-native-masked-text'
import fieldFactory from './field-factory';

const MaskedInput = fieldFactory(TextInputMask);
export default MaskedInput;