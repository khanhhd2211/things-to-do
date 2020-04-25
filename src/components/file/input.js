import React, { Component } from 'react';
import classNames from 'classnames';
//css
import '../css/input.css'
import '../css/list.css'
if (!localStorage.getItem('thingsToDo')) {
    localStorage.setItem('thingsToDo', JSON.stringify([]));
}
class Input extends Component {
    constructor() {
        super();
        this.state = {
            beforeBtn: [
                { type: 'all', activated: true },
                { type: 'active' },
                { type: 'completed' }
            ],
            thing: '',
            thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
        }
        this.addThing = this.addThing.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.onClearChecked = this.onClearChecked.bind(this)
    }

    beforeBtn(type) {
        return () => {
            const { beforeBtn } = this.state;
            let activatedBtn = [];
            beforeBtn.forEach((item) => { 
                let btn = { type: item.type };
                if (item.type === type) {
                    btn.activated = true;
                } else {
                    btn.activated = false;
                }
                activatedBtn.push(btn)
            })
            this.setState({
                beforeBtn: activatedBtn,
            })
            if (type === 'all') {
                this.setState({
                    thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
                })
            } else if ( type === 'active' ) {
                this.setState({
                    thingsToDo: JSON.parse(localStorage.getItem('thingsToDo')).filter((item) => {
                        return !item.isComplete
                    })
                })
            } else if ( type === 'completed' ) {
                this.setState({
                    thingsToDo: JSON.parse(localStorage.getItem('thingsToDo')).filter((item) => {
                        return item.isComplete
                    })
                })
            }
        }
    }

    addThing(event) {
        const value = event.target.value;
        if (event.keyCode === 13) {
            if (value !== '') {
                const { thingsToDo } = this.state;
                const newThings = [
                    ...thingsToDo,
                    { thingToDo: value }
                ];
                localStorage.setItem('thingsToDo', JSON.stringify(newThings));
                this.setState({
                    thing: '',
                    thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
                })
            }
        }
    }
    onChange(event) {
        let value = event.target.value;
        this.setState({
            thing: value
        })
    }

    onChecked(item) {
        return (event) => {
            const isComplete = item.isComplete
            const { thingsToDo } = this.state;
            const index = thingsToDo.indexOf(item);
            const newThings = [
                ...thingsToDo.slice(0, index),
                { thingToDo: item.thingToDo, isComplete: !isComplete },
                ...thingsToDo.slice(index + 1),
            ];
            localStorage.setItem('thingsToDo', JSON.stringify(newThings));
            this.setState({
                thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
            })
        }
    }

    onClose(item) {
        return (event) => {
            const { thingsToDo } = this.state;
            const index = thingsToDo.indexOf(item);
            const newThings = [
                /* eslint-disable no-undef */
                ...thingsToDo.slice(0, index),
                ...thingsToDo.slice(index + 1)
            ]
            localStorage.setItem('thingsToDo', JSON.stringify(newThings));
            this.setState({
                thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
            })
        }
    }

    onCheckAll() {
        const { thingsToDo } = this.state;
        const checkAllThings = thingsToDo.map((item) => {
            return {
                thingToDo: item.thingToDo,
                isComplete: true
            }
        })
        localStorage.setItem('thingsToDo', JSON.stringify(checkAllThings));
        this.setState({
            thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))
        })
    }

    onClearChecked() {
        const { thingsToDo } = this.state;
        const notComplete = thingsToDo.filter((item) => {
            return !item.isComplete 
        })
        localStorage.setItem('thingsToDo', JSON.stringify(notComplete));
        this.setState({
            thingsToDo: JSON.parse(localStorage.getItem('thingsToDo'))  
        })
    }

    render() {
        let { thingsToDo, thing, beforeBtn } = this.state;
        return(
            <div className="wrap">
                <div className="wrap-input">
                    <div className="Input">
                        <img className="img img-1" alt="arrow right" src="/arrow-01.svg" height="50" />
                        <input 
                            placeholder="Thing need to be done" 
                            onKeyUp={this.addThing} 
                            value={thing} 
                            onChange={this.onChange}
                            className="todo-input" 
                            spellcheck="false"   
                        />
                        <img className="img img-1" alt="arrow right" src="/arrow-02.svg" height="50" />
                    </div>
                    <div className="before-btn">
                        {
                            beforeBtn.map((item, index) => {
                                return(
                                    <div 
                                        className={classNames('btn', item.type, { activated: item.activated })}
                                        onClick={this.beforeBtn(item.type)}
                                        key={index}
                                    >
                                            {item.type}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="List" >
                    {
                        /* eslint-disable no-unused-expressions */
                        thingsToDo.map((item, index) => {  
                            return(
                                <div key={index} className="item">
                                    <div 
                                        className={classNames('check-box', { 'checked': item.isComplete })} 
                                        onClick={this.onChecked(item)}
                                    />
                                    <div className={classNames('text', { 'item-checked': item.isComplete })}>
                                        {item.thingToDo}
                                    </div>
                                    <div className="close" onClick={this.onClose(item)} />
                                </div>
                            )
                        })
                    }
                    <div className={classNames('after-btn', { 'none-display': thingsToDo.length === 0 })}>
                        <div 
                            className="all check-all"
                            onClick={this.onCheckAll}    
                        >
                                Check all
                        </div>
                        <div 
                            className="all clear-all"
                            onClick={this.onClearChecked}
                        >
                                Clear all checked
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Input;