import './<%= componentName %>.scss';

let htmlTpl = <string>require('./<%= componentName %>.html');

export class <%= componentNameCamel %>Component implements ng.IComponentOptions  {
    static selector: string = '<%= componentSelectorName %>';

    public controller: Function = <%= componentNameCamel %>Controller;

    public template: string = htmlTpl;

    // @Inputs and @Outputs
    public bindings: { [binding: string]: string; } = {};
}

export class <%= componentNameCamel %>Controller {
    static $inject = [];

    constructor() {}

}

