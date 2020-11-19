
/**
 * @typedef FormInput
 * @property {HTMLInputElement|null} $input input实例
 * @property {HTMLElement|null} $info 错误信息 div 实例
 * @property {Function} verify 验证
 * @property {Function} setInfo 设置提示信息
 * @property {Function} bind 绑定实例
 */

/**
 * @type {FormInput}
 */
const formInput = {
  $input: null,
  $info: null,
  verify(verifier, info = '') {
    if (!this.$input) {
      throw new Error('Please bind input element');
      return false;
    }
    const value = this.$input.value;
    let _info = verifier(value);
    
    if (_info == null) {
      _info = '';
    } else {
      _info += '';
    }

    if (!_info){
      this.setInfo('');
      return true;
    } 
    this.setInfo(info ? info : _info);
    return false;
  },
  setInfo(errInfo) {
    if (!this.$info) {
      throw new Error('Please bind info element');
    }

    this.$info.innerText = errInfo + '';
  },
  bind(ele) {
    this.$input = ele;
    this.$info = ele?.parentElement?.parentElement?.lastElementChild;
  },
  bindInfo(ele) {
    this.$info = ele;
  }
};

/**
 * @typedef SecurityCode
 * @property {HTMLImageElement} $securityCode
 * @property {Function} getCode 获取验证码
 * @property {Function} setStatus 设置获取状态
 * @property {Function} bind 绑定实例
 */

/**
 * @type {SecurityCode}
 */
const securityCode = {
  $securityCode: null,
  getCode() {

  },
  setStatus(status = true) {

  },
  bind(ele) {
    this.$securityCode = ele;
  }
};

export {
  formInput,
  securityCode,
}