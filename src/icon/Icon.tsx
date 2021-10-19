import { PropType, defineComponent, inject, computed } from 'vue';
import { addUnit, createNamespace } from '../utils';
import { Badge } from '../badge';
import { CONFIG_PROVIDER_KEY } from '../config-provider/ConfigProvider';

const [name, bem] = createNamespace('icon');

function isImage(name?: string) {
  return name?.includes('/');
}

export default defineComponent({
  name,

  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    classPrefix: String,
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'i',
    },
    spin: Boolean,
    rotate: Number,
  },

  setup(props, { slots }) {
    const config = inject(CONFIG_PROVIDER_KEY, null);

    const classPrefix = computed(
      () => props.classPrefix || config?.iconPrefix || bem()
    );

    return () => {
      const { tag, dot, name, size, badge, color, spin, rotate } = props;
      const isImageIcon = isImage(name);

      return (
        <Badge
          dot={dot}
          tag={tag}
          content={badge}
          class={[
            classPrefix.value,
            isImageIcon ? '' : `${classPrefix.value}-${name}`,
            spin ? `${classPrefix.value}-spin` : '',
          ]}
          style={{
            color,
            fontSize: addUnit(size),
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {slots.default?.()}
          {isImageIcon && <img class={bem('image')} src={name} />}
        </Badge>
      );
    };
  },
});
