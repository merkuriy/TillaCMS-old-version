<?php
/**
 * Jare_Typograph_Tool
 *
 * @copyright  	Copyright (c) 2009 E.Muravjev Studio (http://emuravjev.ru)
 * @license    	http://emuravjev.ru/works/tg/eula/
 * @version 	2.0.0
 * @author 		Arthur Rusakov <arthur@emuravjev.ru>
 * @category    Jare
 * @package 	Jare_Typograph
 */
class Jare_Typograph_Tool
{
	/**
	 * Таблица символов
	 *
	 * @var array
	 */
	protected static $_charsTable = array(
		'"' => array('&laquo;', '&raquo;', '&ldquo;', '&lsquo;', '&bdquo;', '&ldquo;', '&quot;', '&#171;', '&#187;','«', '»', '„', '“', '”'),
		' ' => array('&nbsp;', '&thinsp;', ' ', '&#160;'),
		'-' => array('&mdash;', '&ndash;', '&minus;', '&#151;', '—', '&#8212;', '&#8211;'),
		'==' => array('&equiv;'),
		'...' => array('&hellip;'),
		'!=' => array('&ne;', '&#8800;'),
		'<=' => array('&le;', '&#8804;'),
		'>=' => array('&ge;', '&#8805;'),
		'1/2' => array('&frac12;', '&#189;'),
		'1/4' => array('&frac14;', '&#188;'),
		'3/4' => array('&frac34;', '&#190;'),
		'+-' => array('&plusmn;', '&#177;'),
		'&' => array('&amp;', '&#38;'),
		'(tm)' => array('&trade;'),
		'(r)' => array('&reg;', '&#174;', '®'),
		'(c)' => array('&copy;', '&#169;', '©'),
		'`' => array('&#769;'),
		'\'' => array('&rsquo;', '’'),
		'x' => array('&times;', '&#215;', '×'),
	);

	/**
	 * Список из элементов, в которых текст не будет типографироваться
	 *
	 * @var array
	 */
	protected static $_customBlocks = array();
	
	/**
	 * Добавление к тегам атрибута 'id', благодаря которому
	 * при повторном типографирование текста будут удалены теги,
	 * расставленные данным типографом
	 *
	 * @var array
	 */
	protected static $_typographSpecificTagId = false;
	

	/**
	 * Удаление кодов HTML из текста
	 *
	 * @param 	string $text
	 * @return 	string
	 */
	public static function clearSpecialChars($text)
	{
		foreach (self::$_charsTable as $char => $vals) {
			foreach ($vals as $code) {
				$text = str_replace($code, $char, $text);
			}
		}
		
		return $text;
	}
	
	/**
	 * Удаление тегов HTML из текста
	 * Тег <br /> будет преобразов в перенос строки \n, сочетание тегов </p><p> -
	 * в двойной перенос
	 *
	 * @param 	string $text
	 * @param 	array $allowableTag массив из тегов, которые будут проигнорированы
	 * @return 	string
	 */
	public static function removeHtmlTags($text, $allowableTag = null)
	{
		$ignore = null;
		
		if (null !== $allowableTag) {
			if (is_string($allowableTag)) {
				$allowableTag = array($allowableTag);
			}
			
			if (is_array($allowableTag)) {
				require_once 'Jare/Typograph/Tool/Exception.php';
				throw new Jare_Typograph_Tool_Exception('Bad type of param #2');
			}
			
			foreach ($allowableTag as $tag) {
				if ('<' !== substr($tag, 0, 1) || '>' !== substr($tag, -1, 1)) {
					require_once 'Jare/Typograph/Tool/Exception.php';
					throw new Jare_Typograph_Tool_Exception("Incorrect tag $tag");
				}
				
				if ('/' === substr($tag, 1, 1)) {
					require_once 'Jare/Typograph/Tool/Exception.php';
					throw new Jare_Typograph_Tool_Exception("Incorrect tag $tag");
				}
			}
			
			$ignore = implode('', $allowableTag);
		}
		
		$text = preg_replace('/\<br\s*\/?>/i', "\n", $text);
		$text = preg_replace('/\<\/p\>\s*\<p\>/', "\n\n", $text);
		$text = strip_tags($text, $ignore);
		
		return $text;
	}
	
	/**
     * Сохраняем содержимое тегов HTML
     *
     * Тег 'a' кодируется со специальным префиксом для дальнейшей
     * возможности выносить за него кавычки.
     * 
     * @param 	string $text
     * @param 	bool $safe
     * @return  string
     */
    public static function safeTagChars($text, $safe)
    {
    	$safe = (bool) $safe;
    	
    	if (true === $safe) {
        	$text = preg_replace('/(\<\/?)(.+?)(\>)/se', '"\1" .  ( substr(trim("\2"), 0, 1) === "a" ? "%%___"  : ""  ) . self::_encrypteContent(trim("\2"))  . "\3"', $text);
        } else {
        	$text = preg_replace('/(\<\/?)(.+?)(\>)/se', '"\1" .  ( substr(trim("\2"), 0, 3) === "%%___" ? self::_decrypteContent(substr(trim("\2"), 4)) : self::_decrypteContent(trim("\2")) ) . "\3"', $text);	
        }
        
        return $text;
    }
    
    /**
     * Создание тега с защищенным содержимым 
     *
     * @param 	string $content текст, который будет обрамлен тегом
     * @param 	string $tag 
     * @param 	array $attribute список атрибутов, где ключ - имя атрибута, а значение - само значение данного атрибута
     * @return 	string
     */
    public static function buildSafedTag($content, $tag = 'span', $attribute = array())
    {
    	$htmlTag = $tag;
		
    	if (self::$_typographSpecificTagId) {
    		if(!isset($attribute['id'])) {
    			$attribute['id'] = 'jt-2' . mt_rand(1000,9999);
    		}
    	}
    	
		if (count($attribute)) {
			
			foreach ($attribute as $attr => $value) {
				$htmlTag .= " $attr=\"$value\"";
			}
		}
		
		return "<" . self::_encrypteContent($htmlTag) . ">$content</" . self::_encrypteContent($tag) . ">";
    }
    
    /**
     * Список защищенных блоков
     *
     * @return 	array
     */
    public static function getCustomBlocks()
    {
    	return self::$_customBlocks;
    }
    
    /**
     * Удаленного блока по его номеру ключа
     *
     * @param 	int $blockId
     * @return  void
     */
    public static function removeCustomBlock($blockId)
    {
    	if (!is_int($blockId)) {
    		require_once 'Jare/Typograph/Tool/Exception.php';
			throw new Jare_Typograph_Tool_Exception("Incorrect type of value");
    	}
    	
    	if (!isset(self::$_customBlocks[$blockId])) {
    		require_once 'Jare/Typograph/Tool/Exception.php';
			throw new Jare_Typograph_Tool_Exception("Incorrect index");
    	}
    	
    	unset(self::$_customBlocks[$blockId]);
    }
    
    /**
     * Добавление защищенного блока
     *
     * <code>
     *  Jare_Typograph_Tool::addCustomBlocks('<span>', '</span>');
     *  Jare_Typograph_Tool::addCustomBlocks('\<nobr\>', '\<\/span\>', true);
     * </code>
     * 
     * @param 	string $open начало блока
     * @param 	string $close конец защищенного блока
     * @param 	bool $quoted специальные символы в начале и конце блока экранированы
     * @return  void
     */
    public static function addCustomBlocks($open, $close, $quoted = false)
    {
    	$open = trim($open);
    	$close = trim($close);
    	
    	if (empty($open) || empty($close)) {
    		require_once 'Jare/Typograph/Tool/Exception.php';
			throw new Jare_Typograph_Tool_Exception("Bad value");
    	}
    	
    	if (false === $quoted) {
    		$open = preg_quote($open, '/');
            $close = preg_quote($close, '/');
    	}
    	
    	self::$_customBlocks[] = array($open, $close);
    }
    
    /**
     * Сохранение содержимого защищенных блоков
     *
     * @param   string $text
     * @param   bool $safe если true, то содержимое блоков будет сохранено, иначе - раскодировано. 
     * @return  string
     */
    public static function safeCustomBlocks($text, $safe)
    {
    	$safe = (bool) $safe;
    	
    	if (count(self::$_customBlocks)) {
    		$safeType = true === $safe ? "self::_encrypteContent('\\2')" : "stripslashes(self::_decrypteContent('\\2'))";
    		
       		foreach (self::$_customBlocks as $block) {
        		$text = preg_replace("/({$block[0]})(.+?)({$block[1]})/se",   "'\\1' . $safeType . '\\3'"  , $text);
        	}
    	}
        
        return $text;
    }
    
    /**
     * Метод, осуществляющий кодирование (сохранение) информации
     * с целью невозможности типографировать ее
     *
     * @param 	string $text
     * @return 	string
     */
    protected static function _encrypteContent($text)
    {
    	return base64_encode($text);
    }
    
    /**
     * Метод, осуществляющий декодирование информации
     *
     * @param 	string $text
     * @return 	string
     */
    protected static function _decrypteContent($text)
    {
    	return base64_decode($text);
    }
}