export function Log(target: Object, key: string, desc: PropertyDescriptor) {
  const fn = desc.value;

  desc.value = async function () {
    console.log(
      `Executing function: ${key} in ${this.constructor.name}`
    );
    try {
      return await fn.call(this);
    } catch (error) {
      console.log(
        `Error in function: ${key} in class: ${this.constructor.name}`
      );
    }
  };
}
