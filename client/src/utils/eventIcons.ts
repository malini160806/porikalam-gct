/** Maps the semantic icon keys used in event data to the custom heritage icon set. */
const EVENT_ICON_IMAGE: Record<string, string> = {
  'pen-tool': 'clipboard.webp',
  'hard-hat': 'team-people.webp',
  landmark: 'house.webp',
  'message-square-text': 'lightbulb-rays.webp',
  presentation: 'trophy.webp',
  'brain-cog': 'lightbulb-heart.webp',
  search: 'map-pin.webp',
  bot: 'robotic-arm.webp',
  plane: 'leaf-pair.webp',
  rocket: 'download-arrow.webp',
  cog: 'gear.webp',
  'circuit-board': 'circuit-abstract.jpg',
  factory: 'microchip.jpg',
  bug: 'phone-call.webp',
  'clipboard-list': 'clipboard.webp',
  'brain-circuit': 'ai-chip.jpg',
};

export function getEventIconSrc(iconKey: string): string {
  return `/icons/events/${EVENT_ICON_IMAGE[iconKey] ?? 'gear.webp'}`;
}
