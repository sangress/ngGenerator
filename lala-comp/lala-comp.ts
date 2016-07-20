import './lala-comp.scss';

let htmlTpl = <string>require('./lala-comp.html');

export class LalaCompComponent implements ng.IComponentOptions  {
    static selector: string = 'lalaComp';

    public controller: Function = LalaCompController;

    public template: string = htmlTpl;

    // @Inputs and @Outputs
    public bindings: { [binding: string]: string; } = {};
}

export class LalaCompController {
    static $inject = [];

    constructor() {}

}

