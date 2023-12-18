import { Type, applyDecorators } from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiProperty,
    getSchemaPath,
} from '@nestjs/swagger';

export class PaginatedDto<TData> {
    @ApiProperty()
    totalRecords: number;

    records: TData[];

    constructor(partial: Partial<PaginatedDto<TData>>) {
        Object.assign(this, partial);
    }
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedDto, model),
        ApiOkResponse({
            schema: {
                title: `PaginatedResponseOf${model.name}`,
                allOf: [
                    { $ref: getSchemaPath(PaginatedDto) },
                    {
                        properties: {
                            records: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
