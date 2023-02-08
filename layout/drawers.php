<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * A drawer based layout for the boost theme.
 *
 * @package   theme_boost
 * @copyright 2021 Bas Brands
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 *
 * YOUR WHOLE CODE HERE
 *
 */

$teachers = array();
if ($PAGE->pagelayout == 'course') :
    $role = $DB->get_record('role', array('shortname' => 'editingteacher'));
    $context = context_course::instance($COURSE->id);
    // get_role_users($role->id, $context);
    foreach (get_role_users($role->id, $context) as $key => $value) {
        // if($key === "email"):
        //     $teachers[] .= $key.":".$value;
        // endif;
        foreach($value as $keyb => $valueb){
            if($keyb === "email") :
                $teachers[] .=$valueb;
            endif;
        }
    }
    $teachers = json_encode($teachers);
endif;


$templatecontext = [
    /**
     * Your other variables here
     */
    'username' => isloggedin() && !isguestuser() ? $USER->firstname. " ".$USER->lastname : null,
    'pagelayout' => $PAGE->pagelayout,
    'teachers' => json_encode($teachers),
    'footer' => isloggedin() && !isguestuser() ? true : false,
    'isteacher' => \theme_YOURTHEME\toolbox::isTeacherAnywhere()
];

echo $OUTPUT->render_from_template('theme_YOURTHEME/drawers', $templatecontext);
