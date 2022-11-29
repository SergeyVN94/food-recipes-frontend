import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import _ from 'lodash';

/**
 * generic type I - тип для вставляемого в форму элемента через setItem
 *
 * generic type F - описывает тип формы
 *
 * т.к поле formFields абстрактное, в конструкторе наследующего класса нужно
 * сделать его обозреваемым:
 * constructor() {
    super();

    makeObservable(this, {
      formFields: observable,
    });
  }
 */
abstract class AbstractFormStore<I, F extends object> {
  protected originalItem: I | null = null;
  protected abstract defaultFormFields: F;
  public abstract formFields: F;
  public readonly focus: { [key in keyof F]?: boolean } = {};
  public readonly errors: { [key in keyof F]?: string } = {};

  constructor() {
    makeObservable(this, {
      errors: observable,
      focus: observable,
      setItem: action.bound,
      setField: action.bound,
      reset: action.bound,
      resetFields: action.bound,
      resetErrors: action.bound,
      updateErrors: action.bound,
      setFocus: action.bound,
      setBlur: action.bound,
      isFormCompleted: computed,
    });
  }

  setItem(item: I | null = null) {
    this.originalItem = item;
    this.resetFields();
    this.resetErrors();

    // дописать заполнение полей формы.
  }

  getOriginalItem(): I | null {
    return this.originalItem;
  }

  setField<K extends keyof F>(key: K, value: F[K]) {
    this.formFields[key] = value;
  }

  resetFields() {
    let key: keyof F;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (key in this.formFields) this.setField(key, this.defaultFormFields[key]);
  }

  resetErrors(field?: keyof F) {
    if (!field) {
      let key: keyof F;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (key in this.formFields) this.errors[key] = '';
    } else {
      this.errors[field] = '';
    }
  }

  reset() {
    this.resetFields();
    this.resetErrors();
  }

  setFocus(field: keyof F) {
    this.focus[field] = true;
  }

  setBlur(field: keyof F) {
    this.focus[field] = false;
  }

  abstract updateErrors(field?: keyof F): void; // если ключ не указан, проверяются все поля

  abstract getItem(): I;

  get isFormCompleted(): boolean {
    return _.values(this.errors).every(v => String(v).length === 0);
  }
}

export default AbstractFormStore;
