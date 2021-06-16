export function checkExistParent(child: any, parent: any): boolean {
  let targetElement = child;

  do {
    if (targetElement === parent) {
      return true;
    }
    // @ts-ignore
    targetElement = targetElement.parentNode;
  } while (targetElement);

  return false;
}
