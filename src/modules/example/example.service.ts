import { ApiError } from "@/utils/ApiError";
import { ExampleRepository } from "./example.repository";
import { Example, NewExample } from "./example.types";

export class ExampleService {
  constructor(
    private readonly exampleRepository: ExampleRepository
  ) { }

  async getExamples(): Promise<Example[]> {
    return await this.exampleRepository.findMany()
  }

  async getExampleById(
    id: string
  ): Promise<Example> {
    const example = await this.exampleRepository.findById(id)

    if (!example) {
      throw new ApiError(404, "Example not found")
    }

    return example
  }

  async createExample(
    data: NewExample
  ): Promise<Example> {
    const example = await this.exampleRepository.create(data)

    if (!example) {
      throw new ApiError(404, "Can not create new Example")
    }

    return example
  }

  async updateExample(
    id: string,
    data: Partial<NewExample>
  ): Promise<Example> {

    const existingExample = await this.exampleRepository.findById(id)

    if (!existingExample) {
      throw new ApiError(404, "Example not exsist")
    }

    const example = await this.exampleRepository.update(id, data)

    if (!example) {
      throw new ApiError(404, "Could not update example")
    }

    return example
  }

  async deleteExample(
    id: string
  ): Promise<void> {
    const existingExample = await this.exampleRepository.findById(id)

    if (!existingExample) {
      throw new ApiError(404, "Example not found")
    }

    await this.exampleRepository.delete(id)
  }
}
