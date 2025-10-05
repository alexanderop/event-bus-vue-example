import {
  createLocalFontProcessor,
} from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // Button variants
    ['btn-base', 'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-none rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out active:translate-y-0'],
    ['btn-primary', 'btn-base bg-[rgb(var(--color-accent))] text-white hover:bg-[rgba(var(--color-accent),0.9)] hover:-translate-y-px'],
    ['btn-secondary', 'btn-base bg-[rgba(var(--color-border),0.2)] text-[rgb(var(--color-text-base))] border border-[rgba(var(--color-border),0.3)] hover:bg-[rgba(var(--color-border),0.3)] hover:border-[rgba(var(--color-border),0.5)] hover:-translate-y-px'],

    // Card styles
    ['card', 'bg-[rgb(var(--color-card))] border border-[rgba(var(--color-border),0.3)] rounded-xl overflow-hidden transition-all duration-200 ease-in-out hover:border-[rgba(var(--color-border),0.5)]'],
    ['card-header', 'p-4 bg-[rgba(var(--color-card-muted),0.2)] border-b border-[rgba(var(--color-border),0.2)]'],
    ['card-title', 'm-0 text-base font-semibold text-[rgb(var(--color-text-base))]'],
    ['card-body', 'p-4 flex flex-col gap-4'],

    // Value display
    ['value-display', 'flex flex-col items-center gap-2 p-4 bg-[rgba(var(--color-fill),0.5)] rounded-lg'],
    ['value-label', 'text-xs uppercase tracking-wider text-[rgba(var(--color-text-base),0.6)]'],
    ['value-number', 'text-4xl font-bold text-[rgb(var(--color-accent))]'],

    // Pattern section
    ['pattern-section', 'bg-[rgba(var(--color-card),0.3)] border border-[rgba(var(--color-border),0.2)] rounded-xl p-6 transition-all duration-300 ease-in-out hover:border-[rgba(var(--color-border),0.4)] hover:bg-[rgba(var(--color-card),0.4)]'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
