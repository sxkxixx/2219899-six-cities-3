import {Command} from './command.interface.js';
import axios from 'axios';

import chalk from 'chalk';
import {ServerMockData} from '../../common/types/index.js';
import {OfferGenerator} from '../../common/libs/generator/index.js';
import {TsvWriter} from '../../common/libs/writer/index.js';

export class CommandGenerate implements Command {
  private readonly SERVER_ERROR_MESSAGE: string = 'Error while sending request to a json server';
  private readonly name: string = '--generate';

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    const [offerCount, filePath, url] = _params;
    let jsonServerData: ServerMockData;
    try {
      jsonServerData = await this.loadRentDataFromJsonServer(url);
    } catch (e: unknown) {
      console.log(chalk.red(this.SERVER_ERROR_MESSAGE));
      return;
    }
    const generatedData: string[] = this.generateData(Number(offerCount), jsonServerData);
    await this.writeData(filePath, generatedData);
  }

  private async loadRentDataFromJsonServer(url: string): Promise<ServerMockData> {
    const responseData = await axios.get(url);
    return responseData.data as ServerMockData;
  }

  private generateData(count: number, choicesData: ServerMockData): string[] {
    const result: string[] = [];
    const generator = new OfferGenerator(choicesData);
    for (let i = 0; i < count; i++) {
      result.push(generator.generate());
    }
    return result;
  }

  private async writeData(filePath: string, writeableRows: string[]): Promise<void> {
    const tsvWriter = new TsvWriter(filePath);
    for (const row of writeableRows) {
      await tsvWriter.write(row);
    }
  }
}
