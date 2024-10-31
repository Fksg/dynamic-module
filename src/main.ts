import { Inject, Module } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

@Module({})
class DynamicModule {
    static register(value: string) {
        return {
            module: DynamicModule,
            providers: [{ provide: "TOKEN", useValue: () => value }],
            exports: ["TOKEN"]
        }
    }
}

@Module({ imports: [DynamicModule.register("Module1")] })
class Module1 {
    constructor(@Inject("TOKEN") token: string) {
        console.log(`Should display Module1: ${token}`)
    }
}

@Module({ imports: [DynamicModule.register("Module2")] })
class Module2 {
    constructor(@Inject("TOKEN") token: string) {
        console.log(`Should display Module2: ${token}`)
    }
}

@Module({ imports: [Module1, Module2] })
class AppModule {
}

NestFactory.create(AppModule).then(app => app.listen(3000))