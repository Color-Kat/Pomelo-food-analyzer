import type {NextConfig} from "next";
// // import rootTSConfig from "../../tsconfig.json";
//
// console.log('rootTSConfig', rootTSConfig);

const nextConfig: NextConfig = {
    // webpack(config) {
    //     // Добавляем корень монорепозитория в пути разрешения модулей
    //     config.resolve.modules.push(path.resolve(__dirname, '../..'));
    //
    //     // Применяем пути из корневого tsconfig.json
    //     const paths = rootTSConfig.compilerOptions.paths;
    //     for (const alias in paths) {
    //         const aliasPath = paths[alias][0]; // Берем первый путь из массива
    //         config.resolve.alias[alias.replace('/*', '')] = path.resolve(
    //             __dirname,
    //             '../..',
    //             aliasPath.replace('/*', '')
    //         );
    //     }
    //
    //     return config;
    // },
    /* config options here */
    async rewrites() {
        return [
            {
                source     : '/api/:path*',
                destination: 'http://localhost:3000/:path*',
            },
        ];
    },
};

export default nextConfig;
