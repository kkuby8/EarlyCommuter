export class ApiClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
  }
}
