import EventBus, { EventCallback } from './EventBus'
import Handlebars from 'handlebars'

// Интерфейс для свойств блока
interface BlockProps {
  [key: string]: any
}

export default class Block {
  // События жизненного цикла
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  // Свойства класса
  protected _element: HTMLElement | null = null

  protected _id: number = Math.floor(100000 + Math.random() * 900000)

  protected props: BlockProps

  protected children: Record<string, Block>

  protected lists: Record<string, any[]>

  protected eventBus: () => EventBus

  // Конструктор
  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus()
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren)
    this.props = this._makePropsProxy({ ...props })
    this.children = children
    this.lists = this._makePropsProxy({ ...lists })
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  // Методы жизненного цикла

  /**
   * Регистрация событий жизненного цикла
   */
  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback)
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this) as EventCallback
    )
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as EventCallback
    )
    eventBus.on(
      Block.EVENTS.FLOW_RENDER,
      this._render.bind(this) as EventCallback
    )
  }

  /**
   * Инициализация компонента
   */
  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  /**
   * Логика после монтирования компонента
   */
  private _componentDidMount(): void {
    this.componentDidMount()
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  /**
   * Переопределяемый метод для логики после монтирования
   */
  protected componentDidMount(): void {}

  /**
   * Логика после обновления компонента
   */
  private _componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  /**
   * Переопределяемый метод для логики после обновления
   */
  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    console.log(oldProps, newProps)
    return true
  }

  /**
   * Логика рендеринга компонента
   */
  private _render(): void {
    console.log('Render')
    const propsAndStubs = { ...this.props }
    const tmpId = Math.floor(100000 + Math.random() * 900000)
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`
    })

    const fragment = this._createDocumentElement('template')
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      if (stub) {
        stub.replaceWith(child.getContent())
      }
    })

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement('template')
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent())
        } else {
          listCont.content.append(`${item}`)
        }
      })
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`)
      if (stub) {
        stub.replaceWith(listCont.content)
      }
    })

    const newElement = fragment.content.firstElementChild as HTMLElement
    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }
    this._element = newElement
    this._addEvents()
    this.addAttributes()
  }

  /**
   * Переопределяемый метод для предоставления шаблона компонента
   */
  protected render(): string {
    return ''
  }

  // Методы управления свойствами

  /**
   * Создание прокси для свойств
   */
  private _makePropsProxy(props: any): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: any, prop: string, value: any) {
        const oldTarget = { ...target }
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('No access')
      },
    })
  }

  /**
   * Обновление свойств компонента
   */
  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  /**
   * Обновление списков компонента
   */
  public setLists = (nextList: Record<string, any[]>): void => {
    if (!nextList) {
      return
    }

    Object.assign(this.lists, nextList)
  }

  // Методы управления DOM

  /**
   * Добавление событий к элементу
   */
  private _addEvents(): void {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName])
      }
    })
  }

  /**
   * Добавление атрибутов к элементу
   */
  protected addAttributes(): void {
    const { attr = {} } = this.props

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string)
      }
    })
  }

  /**
   * Установка атрибутов элемента
   */
  protected setAttributes(attr: any): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string)
      }
    })
  }

  /**
   * Создание нового элемента документа
   */
  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement
  }

  // Методы отображения

  /**
   * Показать элемент
   */
  public show(): void {
    const content = this.getContent()
    if (content) {
      content.style.display = 'block'
    }
  }

  /**
   * Скрыть элемент
   */
  public hide(): void {
    const content = this.getContent()
    if (content) {
      content.style.display = 'none'
    }
  }

  // Вспомогательные методы

  /**
   * Разделение свойств и детей
   */
  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>
    props: BlockProps
    lists: Record<string, any[]>
  } {
    const children: Record<string, Block> = {}
    const props: BlockProps = {}
    const lists: Record<string, any[]> = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (Array.isArray(value)) {
        lists[key] = value
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        props[key] = value
      }
    })

    return { children, props, lists }
  }

  /**
   * Получение содержимого элемента
   */
  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created')
    }
    return this._element
  }

  /**
   * Получение элемента
   */
  get element(): HTMLElement | null {
    return this._element
  }

  /**
   * Отправка события монтирования компонента
   */
  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }
}
