export const endpointPrefix = '';

export function getEndpointFor(api: string, microservice?: string): string {
  if (microservice) {
    return `${endpointPrefix}services/${microservice}/${api}`;
  }
  return `${endpointPrefix}${api}`;
}
