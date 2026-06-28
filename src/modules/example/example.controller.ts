import type { Request, Response } from "express"
import { Example } from "./example.types"
import { ExampleService } from "./example.service"
import { CreateExampleInput, DeleteExampleInput, GetExampleByIdInput, UpdateExampleInput, UpdateExampleParams } from "./example.schema"

export class ExampleController {
  constructor(
    private readonly exampleService: ExampleService
  ) { }

  getExamples = async (
    _req: Request,
    res: Response
  ) => {
    const examples: Example[] = await this.exampleService.getExamples()

    res.status(200).json({
      success: true,
      data: examples
    })
  }

  getExampleById = async (
    req: Request<GetExampleByIdInput>,
    res: Response
  ) => {
    const { id } = req.params
    const example = await this.exampleService.getExampleById(id)

    res.status(200).json({
      success: true,
      data: example
    })
  }

  createExample = async (
    req: Request<object, object, CreateExampleInput>,
    res: Response,
  ) => {
    const example = await this.exampleService.createExample(req.body);

    res.status(201).json({
      success: true,
      data: example,
    });
  };

  updateExample = async (
    req: Request<UpdateExampleParams, object, UpdateExampleInput>,
    res: Response,
  ) => {
    const { id } = req.params;
    const example = await this.exampleService.updateExample(id, req.body);

    res.status(200).json({
      success: true,
      data: example,
    });
  };

  deleteExample = async (
    req: Request<DeleteExampleInput>,
    res: Response,
  ) => {
    const { id } = req.params;
    await this.exampleService.deleteExample(id);

    res.status(200).json({
      success: true,
      message: "Example deleted successfully",
    });
  };
}
