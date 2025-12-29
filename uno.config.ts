import { defineConfig, transformerDirectives } from 'unocss';

export default defineConfig({
    theme: {
        fontFamily: {
            ega: 'IBM_EGA_8x14',
            model3x: 'IBM_Model3x_Alt2',
            gohu: 'GohuFont-Medium',
        }
    },
    transformers: [
        transformerDirectives(),
    ],
});
