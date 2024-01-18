/**
 * интерфейс для описания записки
 */
export interface Inote {
    /**
     * id записки
     */
    id: number, 
    /**
     * Текст записки
     */
    description: string,
    /**
     * Ссылка на изображение
     */
    picture: string,
    /**
     * проверка на наличие изображения
     */
    isPicture: boolean,
    /**
     * день создания записки
     */
    day: string,
    /**
     * месяц создания записки
     */
    month: string,
    /**
     * год создания записки
     */
    year: string,
    /**
     * час создания записки
     */
    hour: string,
    /**
     * минуты создания записки
     */
    minutes: string,
    /**
     * секунды создания записки
     */
    second: string,
}