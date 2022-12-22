export abstract class Utils {
  static IsObjectEmpty = (value: any): boolean =>
    JSON.stringify(value) === "{}";

  static AreObjectsEqual = (first: any, second: any) =>
    JSON.stringify(first) === JSON.stringify(second);

  static ObjectToFormData(
    model: any,
    formData: FormData = new FormData(),
    namespace = ""
  ): FormData {
    Object.keys(model).forEach((propertyName) => {
      if (
        Object.prototype.hasOwnProperty.call(model, propertyName) &&
        model[propertyName]
      ) {
        const formKey = namespace
          ? `${namespace}.${propertyName}`
          : propertyName;

        if (model[propertyName] instanceof Date) {
          formData.append(formKey, model[propertyName].toISOString());
        } else if (model[propertyName] instanceof Array) {
          model[propertyName].forEach((element: any, index: number) => {
            if (typeof element === "string") {
              formData.append(`${formKey}[]`, element.toString());
            } else {
              const tempFormKey = `${formKey}[${index}]`;
              this.ObjectToFormData(element, formData, tempFormKey);
            }
          });
        } else if (
          typeof model[propertyName] === "object" &&
          !(model[propertyName] instanceof File)
        ) {
          this.ObjectToFormData(model[propertyName], formData, formKey);
        } else if (model[propertyName] instanceof File) {
          formData.append(
            formKey,
            model[propertyName],
            (model[propertyName] as unknown as File).name
          );
        } else {
          formData.append(formKey, model[propertyName].toString());
        }
      } else if (typeof model[propertyName] === "boolean") {
        const formKey = namespace
          ? `${namespace}.${propertyName}`
          : propertyName;

        formData.append(formKey, model[propertyName]);
      }
    });
    return formData;
  }
}

export default Utils;
