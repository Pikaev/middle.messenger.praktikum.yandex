//@ts-nocheck
import EventBus from './EventBus';
import Handlebars from 'handlebars';

export default class Block {
  // Свойства класса
  _element = null;

  _id = Math.floor(100000 + Math.random() * 900000);

  props;

  children;

  lists;

  eventBus;

  // События жизненного цикла
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  // Конструктор
  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // Методы жизненного цикла

  /**
   * Регистрация событий жизненного цикла
   */
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Инициализация компонента
   */
  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  /**
   * Логика после монтирования компонента
   */
  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  /**
   * Переопределяемый метод для логики после монтирования
   */
  componentDidMount(oldProps) {}

  /**
   * Логика после обновления компонента
   */
  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  /**
   * Переопределяемый метод для логики после обновления
   */
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  /**
   * Логика рендеринга компонента
   */
  _render() {
    console.log('Render');
    const propsAndStubs = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    // Замена заглушек на содержимое детей
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub.replaceWith(child.getContent());
    });
    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub.replaceWith(listCont.content);
    });
    const newElement = fragment.content.firstElementChild;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  /**
   * Переопределяемый метод для предоставления шаблона компонента
   */
  render() {}

  // Методы управления свойствами

  /**
   * Создание прокси для свойств
   */
  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  /**
   * Обновление свойств компонента
   */
  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  // Методы управления DOM

  /**
   * Добавление событий к элементу
   */
  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Добавление атрибутов к элементу
   */
  addAttributes() {
    const { attr = {} } = this.props;
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  /**
   * Создание нового элемента документа
   */
  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  // Методы отображения

  /**
   * Показать элемент
   */
  show() {
    this.getContent().style.display = 'block';
  }

  /**
   * Скрыть элемент
   */
  hide() {
    this.getContent().style.display = 'none';
  }

  // Вспомогательные методы

  /**
   * Разделение свойств и детей
   */
  _getChildrenPropsAndProps(propsAndChildren) {
    const children = {};
    const props = {};
    const lists = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props, lists };
  }

  /**
   * Получение содержимого элемента
   */
  getContent() {
    return this.element;
  }

  /**
   * Получение элемента
   */
  get element() {
    return this._element;
  }
}
